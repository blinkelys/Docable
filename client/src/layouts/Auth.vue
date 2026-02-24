<template>
    <header>
        <nav>
            <div class="w-full flex flex-row gap-8 p-4 bg-white text-black z-100 absolute top-0 right-0">
                <h1 class="font-semibold">
                    Docable
                </h1>
            </div>
        </nav>
    </header>

    <main class="grow">
      <slot></slot>
    </main>
</template>