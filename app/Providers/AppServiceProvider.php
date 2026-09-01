<?php

namespace App\Providers;

use App\Models\Alokasi;
use App\Models\ItemInventory;
use App\Models\Pengiriman;
use App\Models\TenagaMedis;
use App\Models\Role;
use App\Models\User;
use App\Policies\PageAkun;
use App\Policies\PageAlokasi;
use App\Policies\PagePengiriman;
use App\Policies\PagePenyaluran;
use App\Policies\PageTenagaMedis;
use App\Policies\PageReceivedPengiriman;
use App\Policies\PageRegistrasiItem;
use App\Policies\PageRole;
use Carbon\CarbonImmutable;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\ServiceProvider;
use Illuminate\Validation\Rules\Password;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Gate::policy(TenagaMedis::class, PageTenagaMedis::class);
        Gate::policy(User::class, PageAkun::class);
        Gate::policy(Role::class, PageRole::class);
        Gate::policy(Alokasi::class, PageAlokasi::class);
        Gate::policy(ItemInventory::class, PageRegistrasiItem::class);
        Gate::policy(Pengiriman::class, PagePengiriman::class);
        Gate::define('all', fn($user) => $user->hasRole('admin_pusat'));
        Gate::define('viewPOD', [PagePenyaluran::class, 'viewPOD']);
        Gate::define('createPOD', [PagePenyaluran::class, 'createPOD']);

        $this->trustProxies();
        $this->configureDefaults();
    }

    /**
     * Configure default behaviors for production-ready applications.
     */
    protected function configureDefaults(): void
    {
        Date::use(CarbonImmutable::class);

        DB::prohibitDestructiveCommands(
            app()->isProduction(),
        );

        Password::defaults(
            fn(): ?Password => app()->isProduction()
                ? Password::min(12)
                ->mixedCase()
                ->letters()
                ->numbers()
                ->symbols()
                ->uncompromised()
                : null
        );
    }

    protected function trustProxies(): void
    {
        if (!app()->runningInConsole()) {
            $host = request()->getSchemeAndHttpHost();

            if ($host) {
                config()->set('app.url', $host);
            }
        }
    }
}
