// 联盟 统一入口
export default function (DataArr, _this, objectFun) {
    _.forEach(DataArr, i => {
        if (i.name == globalData.username) {
            i.run(_this, objectFun);
        }
    });
}
