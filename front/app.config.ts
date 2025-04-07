import type { ToasterProps } from "@nuxt/ui";

type appConfigProps = {
    toaster: ToasterProps,
    ui: {
        colors: {
            primary: string,
            secondary: string,
            tertiary: string
        }
    }
}

const appConfig:appConfigProps = {
    toaster: {
        position: 'top-center',
        expand: true,
        duration: 5000
    },
    ui: {
        colors: {
            primary: 'green',
            secondary: 'trueviolet',
            tertiary: 'tacao'
        }
    }
}

export default defineAppConfig(appConfig);