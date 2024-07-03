'use strict';

const { statSync, chmodSync } = require('fs');
const Executable = 0o111;

module.exports = function execute(options = {}) {
    return {
        name: 'rollup-plugin-executable',
        onwrite: ({ file }) => {
            const { mode } = statSync(file);
            const newMode = mode | Executable;
            chmodSync(file, newMode);
        }
    };
};
