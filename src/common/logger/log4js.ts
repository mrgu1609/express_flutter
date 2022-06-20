import log4js from 'log4js';

const config = {
  replaceConsole: true,
  appenders: {
    cheese: {
      // 设置类型为 dateFile
      type: 'dateFile',
      // 配置文件名为 logs
      filename: 'logs/logs.log',
      // 指定编码格式为 utf-8
      encoding: 'utf-8',
      // 配置 layout，此处使用自定义模式 pattern
      layout: {
        type: 'pattern',
        pattern:
          '{"date":"%d{yyyy/MM/dd-hh.mm.ss}","level":"%p","category":"%c","host":"%h","pid":"%z","data":\'%m\'}',
      },
      // 日志文件按日期（天）切割
      pattern: '-yyyy-MM-dd',
      // 回滚旧的日志文件时，保证以 .log 结尾 （只有在 alwaysIncludePattern 为 false 生效）
      keepFileExt: true,
      // 输出的日志文件名是都始终包含 pattern 日期结尾
      alwaysIncludePattern: true,
      numBackups: 60,
    },
    errorFile: {
      type: 'dateFile',
      // 配置文件名为 logs
      filename: 'logs/error.log',
      // 输出的日志文件名是都始终包含 pattern 日期结尾
      alwaysIncludePattern: true,
      layout: {
        type: 'pattern',
        pattern:
          '{"date":"%d{yyyy/MM/dd-hh.mm.ss}","level":"%p","category":"%c","host":"%h","pid":"%z","data":\'%m\'}',
      },
      // 日志文件按日期（天）切割
      pattern: '-yyyy-MM-dd',
      // 回滚旧的日志文件时，保证以 .log 结尾 （只有在 alwaysIncludePattern 为 false 生效）
      keepFileExt: true,
      numBackups: 60,
    },
  },
  categories: {
    // 设置默认的 categories
    default: { appenders: ['cheese'], level: 'debug' },
  },
};

log4js.configure(config);

export default log4js;
