if (navigator.serviceWorker) {
    navigator.serviceWorker.register('js/register_sw.js')
    .then(registration => {
        console.log(`Registration successful, scope is ${registration.scope}`);
    }).catch(error => {
        console.log(`Service worker registration failed, error: ${error}`);
    });
}
importScripts('js/register_sw.js');  // Update path to match your own setup.
