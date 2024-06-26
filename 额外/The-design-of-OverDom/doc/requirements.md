# 需求文档
目录：
* [修建](#1.修建)
* [孵化](#2.孵化)
* [采集](#3.采集)
* [物流](#4.物流)
* [工业](#5.工业)
* [侦查](#6.侦查)
* [战术](#7.战术)
* [民用 Creep](#8.民用-creep)
* [军用 Creep](#9.军用-creep)
* [PowerCreep](#10.PowerCreep)
* [市场](#11.市场)
* [战略](#12.战略)

备忘：
1. 需要高层决策安排各工作的能量预算
1. creep renew 由孵化控制管还是 creep 控制管
1. 刷墙位置由修建模块单独计算，还是受战术模块安排
4. 设为常规墙由修建模块管，临时墙



## 1.修建
指判断维修、拆建筑、摆工地以及取消工地的逻辑，通过任务机制与 creep 孵化及控制解耦。

模块提供的服务：
1. 刷墙速率、上限控制
    * 刷墙位置是否需要由战术模块安排？
1. 启动、停止新建和拆除
    * 在战争中突破 RCL 不一定适合马上点建筑
    * 战争与平时点建筑顺序不同
1. 修建速率可控
*** 
### 1.1.新建
* 判断当前能造什么
* 选择最先造的（一些）建筑，其余的在队列中等待
    * 评估成本
    * 评估需求
* 判断是否要拆除建筑
    * 安排拆除，外房拆除需评估工作量
* 评估工作量发布建造任务
* 中止建造

### 1.2.维修
* 考虑新 pc 的范围维修技能
#### 1.2.1.维持
针对 road、container 和 达到预期目标的 rampart。
* 废弃的建筑不用处理
* 按损坏速度定时检查
* 累积一定工作量后才发布任务
#### 1.2.2.刷墙
针对需要提升的墙。
* 按上层决策传下的防核弹策略，额外刷 rampart
* 不满 RCL8 时的刷墙策略


## 2.孵化
提供服务：
1. 登记 spawn 的新建与拆除
1. 接受 creep 出生任务

*** 

* spawn 状态监控
    * 不可使用的状态有：在忙，能量不足，防御已被攻破
    * 登记 spawn 的新建与拆除
* 维护孵化队列
    * 为 creep 选择合适的 spawn
* 在有 spawn 空闲时判断能量与队列
    * 没有能量也未曾发布对应物流需求，则发布物流需求；  
    自身挂起到 Timer 等待物流满足
    * 有能量则选取孵化队列中最优先的 creep
* 成功启动孵化，发布物流需求
    * pc 有填 extension 技能时，空 extension 攒多些再用技能填，在攒时避免 creep 填


## 3.采集
仅负责监管采挖各种 resources，而物流与孵化需求以任务形式递送给其他模块。

服务器规则会改变某种资源存在与否。

包括跨房统筹和单房控制。

### 3.1.能量
* 根据能量累积速率判断爆仓风险
* 
### 3.2.Mineral


### 3.3.PowerBank
计算 PB 的侦查、开采、运输需求。
* 需要申请 ob （注册 ob 任务），ob 成功后回调

### 3.4.Deposit
计算 Deposit 的侦查、开采、运输需求。
* 需要申请 ob （注册 ob 任务），ob 成功后回调


## 4.物流
### 4.1.单房
用[史诗级智慧物流算法](Logistics.md)处理！
### 4.2.跨房
### 4.3.跨 shard



## 5.工业



## 6.侦查
监控过道、要塞、新手区、敌人动向等，以及在无视野活动中先行探路。



## 7.战术
计算战斗相关的攻击需求、防御需求、搜刮需求等。

### 7.1.战争策略

### 7.2.战斗控制


## 8.民用 Creep



## 9.军用 Creep



## 10.PowerCreep



## 11.市场



## 12.战略
### 12.1.发展目标
### 12.2.扩张与转移
### 12.3.军事战略