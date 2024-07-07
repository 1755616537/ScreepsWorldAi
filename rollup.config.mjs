// https://www.jianshu.com/p/13e2cbcb60ab

import clear from 'rollup-plugin-clear'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
// TS
import typescript from 'rollup-plugin-typescript2'
import screeps from 'rollup-plugin-screeps'
import { terser } from 'rollup-plugin-terser';
import copy from 'rollup-plugin-copy'
import secretConfig from './.secret.json' assert {type: 'json'};
// json
import json from '@rollup/plugin-json'
// 执行外部脚本
import exec from 'rollup-plugin-exec'

let config = secretConfig[process.env.DEST];
if (!process.env.DEST) console.log("未指定目标, 代码将被编译但不会上传")
else if (!config) {
    throw new Error("无效目标，请检查 secret.json 中是否包含对应配置");
}

// 根据指定的配置决定是上传还是复制到文件夹
const pluginDeploy = config && config.copyPath ?
    // 复制到指定路径
    copy({
        targets: [
            {
                src: 'dist/main.js',
                dest: config.copyPath
            },
            {
                src: 'dist/main.js.map',
                dest: config.copyPath,
                rename: name => name + '.map.js',
                transform: (contents) => `module.exports = ${contents.toString()};`
            }
        ],
        hook: 'writeBundle',
        verbose: true
    }) :
    // 更新 .map 到 .map.js 并上传
    screeps({config, dryRun: !config})

const preamble =
    "/**\n" +
    "  * screeps v1.0.0\n" +
    "  * (c) 2023 GGG\n" +
    "  * @license GPL-3.0\n" +
    "  */";

export default {
    input: 'src/main.ts',
    output: [
        {
            file: "dist/main.js",
            format: "cjs",
            sourcemap: true
        },
        {
            file: "dist/main.min.js",
            format: "cjs",
            plugins: [
                terser({
                    ecma: 2016,
                    format: {
                        preamble
                    }
                }),
            ],
            sourcemap: true
        }
    ],
    plugins: [
        // 清除上次编译成果
        clear({targets: ["dist"]}),
        // 在打包前执行脚本
        // exec({
        //     cmd: 'node fetchData.js', // 调用 fetchData.js 脚本
        //     stdout: true, // 控制台输出执行结果
        //     stderr: true, // 包含错误输出
        //     cwd: process.cwd(), // 当前工作目录
        //     async: true, // 异步执行
        // }),
        // 使用 json 插件
        json(),
        // 打包依赖
        resolve(),
        // 模块化依赖
        commonjs(),
        // 编译 ts
        typescript({tsconfig: "./tsconfig.json"}),
        // 压缩
        terser({
            output:{
                // 保持格式
                beautify: true
            },
            mangle: true, // 关闭变量重命名，以保持变量名不变
        }),
        // 执行上传或者复制
        pluginDeploy
    ]
};