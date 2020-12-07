let vm = new Vue({
  el: '#app',
  data: {
    visible: false,
    replys: [{
        id: 1,
        name: '审批编号',
        content: '202011080115',
        type: 1
      },
      {
        id: 2,
        name: '提交时间',
        content: '2020/11/8 16:45',
        type: 1
      },
      {
        id: 3,
        name: '所在部门',
        content: '193班',
        type: 1
      },
      {
        id: 4,
        name: '请假类型',
        content: '事假',
        type: 1
      },
      {
        id: 5,
        name: '请假出校门时间',
        content: '2020/11/8',
        type: 1
      },
      {
        id: 6,
        name: '请假具体内容',
        content: '有事外出',
        type: 1
      },
      {
        id: 7,
        name: '当前所在位置',
        content: '2020/11/8 16:45',
        type: 2
      },
      {
        id: 8,
        name: '是否明确返校时间是当日21:00前?',
        content: '是',
        type: 1
      },
    ],
    updateTime: '11/08 16:45',
    qingjia: 1,
    grade: '',
    content:''
  },

})