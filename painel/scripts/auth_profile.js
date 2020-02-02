auth.onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in.
        var email = user.email;
        var uid = user.uid;
        console.log(email, uid);

        document.getElementById('avatar_big').src=user.photoURL
        document.getElementById('avatar_small').src=user.photoURL
    } else {
        // User is signed out.
        console.log('signed out');
        window.location.href = '/login.html';

        // ...
    }

});