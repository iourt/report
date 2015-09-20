安装文档
-----------------------------

接口文档
-----------------------------
#### getPageModel
> 获取页面模块（分类）
Request:
```
{

}
```
Response:
```
{
    Page: [
        {
            Id: ID
            PageId: 页面的pageid
            Name: 页面的名称
            Url: 页面的url
        }
    ]

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