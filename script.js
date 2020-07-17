$(function () {
    /**
     * Registrar el Service Worker
     * @author Daniel Valencia <2020/07/16>
     */
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./sw.js', { scope: './' })
            .then()
            .catch(err => {
                console.log("Service Worker Failed to Register", err);
            })
    }

    /**
     * Definir las cookies
     */
    document.cookie = 'same-site-cookie=foo; SameSite=Lax';
    document.cookie = 'cross-site-cookie=bar; SameSite=None; Secure';

    var deferredPrompt;

    /**
     * Si la PWA todavía no está instalada.
     * @author Daniel Valencia <2020/07/16>
     */
    window.addEventListener('beforeinstallprompt', (event) => {
        event.preventDefault();
        deferredPrompt = event;
        seeInstallationButton()
    });

    /**
     * Cuando se de click en el botón de instalación
     * Se habilitará la opción del navegador para instalar
     * @author Daniel Valencia <2020/07/16>
     */
    $("#butInstall").on("click", function () {
        if (deferredPrompt === undefined) return;
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then(function (choiceResult) {
            deferredPrompt = null;
            seeInstallationButton(true)
        });
    })

    /**
     * Habilita la visualización del botón de instalación
     * @param Boolean see
     * @author Daniel Valencia <2020/07/16>
     */
    function seeInstallationButton(see = false) {
        let classNoShow = "hidden"
        let buttonInstall = $("#installContainer")

        if (see && !buttonInstall.hasClass(classNoShow)) {
            buttonInstall.addClass(classNoShow)
        } else if (!see && buttonInstall.hasClass(classNoShow)) {
            buttonInstall.removeClass(classNoShow)
        }
    }
})