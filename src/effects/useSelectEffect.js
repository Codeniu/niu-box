import { reactive } from 'vue'
// 选择组件相关、
// 用于 Box 相关组件
const useSelectEffect = () => {
  // 标签选项
  const tagOptions = reactive([
    {
      value: 'Tool',
      label: 'Tool',
    },
    {
      value: 'Dev',
      label: 'Dev',
    },
    {
      value: 'JavaScript',
      label: 'JavaScript',
    },
    {
      value: 'CSS',
      label: 'CSS',
    },
    {
      value: 'Fun',
      label: 'Fun',
    },
  ])
  // 分类选项
  const typeOptions = reactive([
    {
      value: '导航资讯',
      label: '导航资讯',
      text: '导航资讯',
    },
    {
      value: '开发工具',
      label: '开发工具',
      text: '开发工具',
    },
    {
      value: '技术文档',
      label: '技术文档',
      text: '技术文档',
    },
    {
      value: '论坛社区',
      label: '论坛社区',
      text: '论坛社区',
    },
    {
      value: '趣站分享',
      label: '趣站分享',
      text: '趣站分享',
    },
    {
      value: '图片',
      label: '图片',
      text: '图片',
    },
  ])
  return { tagOptions, typeOptions }
}

export default useSelectEffect
