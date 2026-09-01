<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;

class MakeModule extends Command
{
    protected $signature = 'make:module
                        {name}
                        {--routeIn=}
                        {--vue}
                        {--controller}';
    protected $description = 'Generate Controller and Vue Page';


    public function handle()
    {
        $name = Str::studly($this->argument('name'));
        $controllerName = $name;
        $onlyVue = $this->option('vue');
        $onlyController = $this->option('controller');
        $generatedControllerPath = null;
        $generatedVuePath = null;

        /*
        |-----------------------------------
        | CONTROLLER GENERATION
        |-----------------------------------
        */
        if (!$onlyVue) {
            $controllerPath = app_path("Http/Controllers/pages/{$controllerName}.php");

            if (!File::exists($controllerPath)) {
                $this->call('make:controller', [
                    'name' => "pages/{$controllerName}",
                ]);

                $content = File::get($controllerPath);

                $content = str_replace(
                    "use Illuminate\\Http\\Request;",
                    "use Illuminate\\Http\\Request;\nuse Inertia\\Inertia;",
                    $content
                );

                // Stub tanpa } penutup karena sudah ada di file asli
                $stubClass = <<<PHP
            class {$controllerName} extends Controller
            {
                public function index()
                {
                    return Inertia::render('{$name}');
                }

            PHP;

                $content = preg_replace(
                    "/class\s+{$controllerName}\s+extends\s+Controller\s*\{/",
                    $stubClass,
                    $content,
                    1
                );

                File::put($controllerPath, $content);
                $generatedControllerPath = $controllerPath;
                $this->info("Controller created.");
            } else {
                $this->warn("Controller already exists, skipping.");
                $generatedControllerPath = $controllerPath;
            }
        }

        /*
        |-----------------------------------
        | VUE GENERATION
        |-----------------------------------
        */
        if (!$onlyController) {
            $vuePath = resource_path("js/pages/{$name}.vue");

            if (!File::exists(dirname($vuePath))) {
                File::makeDirectory(dirname($vuePath), 0755, true);
            }

            if (!File::exists($vuePath)) {
                File::put($vuePath, $this->vueStub($name));
                $this->info("Vue page created.");
                $generatedVuePath = $vuePath;
            } else {
                $this->warn("Vue page already exists, skipping.");
                $generatedVuePath = $vuePath;
            }
        }

        /*
        |-----------------------------------
        | ROUTE GENERATION
        |-----------------------------------
        */
        if (!$onlyVue && !$onlyController) {
            // Hanya tambah route jika kedua file (controller + vue) tersedia
            $this->addToRoute($name, $controllerName);
        }

        /*
        |-----------------------------------
        | OPEN VS CODE
        |-----------------------------------
        */
        if ($generatedControllerPath || $generatedVuePath) {
            $this->openInVSCode($generatedControllerPath, $generatedVuePath);
        }

        $this->info("Module {$name} generated successfully.");
    }

    protected function openInVSCode($controllerPath, $vuePath)
    {
        // -r = reuse existing window
        exec("code -r \"{$controllerPath}\"");
        exec("code -r \"{$vuePath}\"");

        $this->info('Files opened in new tabs.');
    }

    protected function addToRoute($name, $controllerName)
    {
        $middleware = $this->option('routeIn');
        $routePath = base_path('routes/web.php');
        $content = File::get($routePath);

        if (!$middleware) {
            $this->warn('No --routeIn option provided.');
            return;
        }

        $routeToInsert = "    Route::get('/" . Str::kebab($name) . "', [App\Http\Controllers\\pages\\{$controllerName}::class, 'index']);\n";

        // Pattern khusus untuk Route::middleware(...)->group(function () { ... });
        // Harus dimulai dari awal baris dengan Route::middleware
        $pattern = '/^Route::middleware\(([^)]+)\)\s*->group\(\s*function\s*\(\)\s*\{([\s\S]*?)\n\}\);/m';

        $found = false;
        $content = preg_replace_callback(
            $pattern,
            function ($matches) use ($middleware, $routeToInsert, &$found) {
                $middlewareBlock = $matches[1];

                // Normalisasi: hapus spasi, quotes, brackets
                $normalized = preg_replace('/[\s\'""\[\]]/', '', $middlewareBlock);
                $middlewares = explode(',', $normalized);

                if (in_array($middleware, $middlewares)) {
                    $found = true;
                    // Sisipkan sebelum \n});
                    // return rtrim($matches[0], "\n});") . "\n" . $routeToInsert . "});";
                    return preg_replace('/\n\}\);$/', "\n" . $routeToInsert . "});", $matches[0]);
                }

                return $matches[0];
            },
            $content
        );

        if ($found) {
            File::put($routePath, $content);
            $this->info("Route inserted into '{$middleware}' middleware group.");
        } else {
            $this->warn("Middleware group '{$middleware}' not found.");
        }
    }

    protected function vueStub($name)
    {
        return <<<VUE
<script setup lang="ts">
import { onMounted } from 'vue';
import PublicLayout from '@/layouts/PublicLayout.vue';
import { dashboard } from '@/routes';
import { useLayoutStore } from '@/store/layoutStore';
import type { BreadcrumbItem } from '@/types/globalType';

const layout = useLayoutStore();
withDefaults(defineProps<{ data?: Record<string, unknown> | null }>(), {
    data: null,
});

onMounted(() => {
    const breadcrumb: BreadcrumbItem[] = [{ label: 'Data {$name}', href: dashboard.url() }];
    layout.setBreadcrumb(breadcrumb);
    layout.\$patch({ activeMenu: { id: 0.0 } });
});
</script>

<template>
    <PublicLayout title="Data TenagaMedis" page-title="Data {$name}" page-sub-title="XXXXXXXX">
        <div class="p-6">
            <h1 class="text-2xl font-bold">{$name} Page</h1>
        </div>
    </PublicLayout>
</template>
VUE;
    }
}
