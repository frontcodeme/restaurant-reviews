
if (navigator.serviceWorker) {
    navigator.serviceWorker.register('js/register_sw.js')
    .then(registration => {
        console.log(`Registration successful, scope is ${registration.scope}`);
    }).catch(error => {
        console.log(`Service worker registration failed, error: ${error}`);
    });
}
// // Adding Seervice Worker
// if ('serviceWorker' in navigator) {
// 	navigator.serviceWorker.register('/sw.js')
// 	    // navigator.serviceWorker.register('js/register_sw.js')
// 	    .then(reg) => {
// 	    	// regestration worked
// 	    	if(reg.installing => {
// 	    		console.log('Service worker is installing');
// 	    	} else if{(reg.waiting) {
// 	    		console.log('service worker installed');
// 	    	} else if (reg.active) {
// 	    		console.log('Service worker is Active');
//     		}

// }	
//         console.log(`Registration successful, scope is ` + reg.scope);
//     }).catch(error => {
//     	// regestration failed
//         console.log(`Registration failed, error: ` + error);
//     });
// }
