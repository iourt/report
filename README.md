## 安装文档

#### 环境配置
> 环境依赖 nodejs、npm、gulp、bower,自行安装



## 接口文档

##### getIndex
> 获取概况信息

Request:
```
{
    Header: {
        Auth: 用户Auth信息
        UserId: 用户ID
    }
}
```
Response:
```
{
    Data: [
        {
            Pv: 浏览量
            Uv: 访客数
            Ip: IP数
            Stop: 平均访问时长
            Jump: 跳出率
            Conversion: 转换率
        }
    ]

    Response: {
        Ack: 数据返回状态 success/failure
        State: 登录状态 true/false
        Time: 服务器当前时间（毫秒）
    }
}
```

##### getPageModel
> 获取页面模块（分类）

Request:
```
{
    Header: {
        Auth: 用户Auth信息
        UserId: 用户ID
    }
}
```
Response:
```
{
    Page: [
        {
            Id: ID
            Name: 模块名称
        }
    ]

    Response: {
        Ack: 数据返回状态 success/failure
        State: 登录状态 true/false
        Time: 服务器当前时间（毫秒）
    }
}
```

##### getPageList
> 根据模块获取页面列表

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

##### getDetailData
> 获取某个页面的统计数据信息

Request:
```
{
    PageId: 页面的pageid

    Time: {
        Start: 开始时间
        End: 结束时间
    }

    Header: {
        Auth: 用户Auth信息
        UserId: 用户ID
    }
}
```

Response:
```
{
    Response: {
        Ack: 数据返回状态 success/failure
        State: 登录状态 true/false
        Time: 服务器当前时间（毫秒）
    }
}
```
