export default class CreepExtension extends Creep {
    public work(): void {

        // 还没出生就啥都不干
        if (this.spawning) {
            return
        }

        // 快死时的处理
        if (this.ticksToLive <= 3) {
            // 如果还在工作，就释放掉自己的工作位置
            if (this.memory.standed) this.room.removeRestrictedPos(this.name)
        }
    }
}