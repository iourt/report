# report


#### getDetailData
获取某个页面的统计数据信息
```request
request:
{<br>
        PageId: 页面的pageid<br>
        Time: [] Time是个数组，第一个是开始时间，第二个是结束时间，如果只有一个时间，那就按小时来统计数据，如果有两个时间就按天来统计数据
}

```response:
response:
{

}