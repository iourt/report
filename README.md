## 安装文档

## 接口文档
##### getPageList
> 获取页面模块（分类）

Request:
```
{
    Id: 模块ID
    Header: {
        Auth: 用户Auth信息
        UserId: 用户ID
    }
}
```
Response:
```
{
    List: [
        {
            Id: ID
            PageId: 页面的pageid
            Name: 页面的名称
            Url: 页面的url
        }
    ]

    Total: 页面总数

    Response: {
        Ack: 数据返回状态 success/failure
        State: 登录状态 true/false
        Time: 服务器当前时间（毫秒）
    }
}
```

#### getDetailData
> 获取某个页面的统计数据信息

request:
```
{
    PageId: 页面的pageid
    Time: [] Time是个数组，第一个是开始时间，第二个是结束时间，如果只有一个时间，那就按小时来统计数据，如果有两个时间就按天来统计数据
    Header: {
        Auth: 用户Auth信息
        UserId: 用户ID
    }
}
```

response:
```
{
    Response: {
        Ack: 数据返回状态 success/failure
        State: 登录状态 true/false
        Time: 服务器当前时间（毫秒）
    }
}
```