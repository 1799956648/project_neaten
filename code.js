const aopFactory = new (require('./class/AopFactory.js'));
const Strategy = require('./class/Strategy.js');
const Validator = require('./class/Validator.js');

// 策略对象
const saveStrategy = function () {
    const strategy = new Strategy();

    // 规则校验独立出来的原因：校验逻辑有时候可能会过于复杂
    const rules = {
        userIsEmpty: (value, errorMsg, action) => { // 用户为空
            if (!value) return { errorMsg, action };
        },
        passwordIsEmpty: (value, errorMsg, action) => { // 密码为空
            if (!value) return { errorMsg, action };
        },
    };

    strategy.batchAddStrategy(rules);

    return strategy;
};

/**
 * @description context 校验器：负责接收用户的请求，并委托给 strategy 对象
 */
const saveValidator = function () {
    const validator = new Validator();

    validator.setStrategy(saveStrategy());

    validator.add('小明', [
        {
            strategy: 'userIsEmpty',
            errorMsg: '名称不能为空',
            action() {
                // 执行不通过，有提示语则弹出提示语，并执行对应动作（如果有的话）
                console.log('userIsEmpty规则执行不通过，需要执行的动作');
            },
        }
    ]);

    validator.add('123', [
        {
            strategy: 'passwordIsEmpty',
            errorMsg: '密码不能为空',
            action() {
                // 执行不通过，有提示语则弹出提示语，并执行对应动作（如果有的话）
                console.log('passwordIsEmpty规则执行不通过，需要执行的动作');
            },
        }
    ]);

    // 接受用户请求，执行校验
    return validator.check();
};

const apiSave = function () {
    // dosomething

    // 本例模拟异步请求
    setTimeout(() => {
        console.log('执行成功');
    }, 1000);
};

// 动态添加职责，使得每一个功能逻辑都可以单独维护，解耦业务逻辑
aopFactory
    .setProxyTarget(apiSave)
    .before(saveValidator)