angular
	.module('decode')
    .factory('Socket', function (socketFactory) {
        return socketFactory({
            ioSocket: io.connect('first-kozh00.c9users.io/')
        });
    });