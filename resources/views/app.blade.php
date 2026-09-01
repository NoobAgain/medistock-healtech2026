<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" @class(['dark' => ($appearance ?? 'system') == 'dark'])>



<head>
    @php
        $appName = config('app.name', 'Laravel');
        $appLongName = config('constants.appname_en', $appName);
        $metaDescription = config('constants.appinfo_en', $appLongName);
        $metaKeywords = 'traceability, audit trail, logistics security, supply chain, medistock';
        $appUrl = config('app.url', url('/'));
        $ogImage = url('/assets/images/Logo.svg');
    @endphp

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="theme-color" content="#4caf38" />

    <meta name="description" content="{{ $metaDescription }}">
    <meta name="keywords" content="{{ $metaKeywords }}">
    <meta property="og:title" content="{{ $appLongName }}">
    <meta property="og:description" content="{{ $metaDescription }}">
    <meta property="og:image" content="{{ $ogImage }}">
    <meta property="og:image:secure_url" content="{{ $ogImage }}">
    <meta property="og:image:type" content="image/svg+xml">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:type" content="website">
    <meta property="og:url" content="{{ $appUrl }}">
    <meta property="og:site_name" content="{{ $appName }}">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="{{ $appLongName }}">
    <meta name="twitter:description" content="{{ $metaDescription }}">
    <meta name="twitter:image" content="{{ $ogImage }}">

    <title inertia></title>
    <meta name="csrf-token" content="{{ csrf_token() }}" />

    <link rel="icon" href="/assets/images/LogoOnly.svg" type="image/svg+xml" sizes="any">
    <link rel="apple-touch-icon" href="/assets/images/LogoOnly.svg">

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@300;400;500;600;700&amp;display=swap" rel="stylesheet">

    @vite(['resources/js/app.ts', "resources/js/pages/{$page['component']}.vue"])
    @inertiaHead
    @cookieconsentscripts
</head>

<body class="font-sans antialiased">
    @inertia
    @cookieconsentview
</body>

</html>
