<template>
  <div>
    <div style="border: 1px solid #ccc; margin-top: 10px; text-align: left">
      <!-- 工具栏 -->
      <Toolbar
        style="border-bottom: 1px solid #ccc"
        :editor="editor"
        :defaultConfig="toolbarConfig"
      />
      <!-- 编辑器 -->
      <Editor
        style="height: 300px; overflow-y: hidden"
        :defaultConfig="editorConfig"
        v-model="html"
        @onChange="onChange"
        @onCreated="onCreated"
      />
    </div>
  </div>
</template>

<script>
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import '@wangeditor/editor/dist/css/style.css'

export default {
  props: {
    EditData: {
      type: String,
      default: '',
    },
  },
  components: { Editor, Toolbar },
  data() {
    return {
      editor: null, // editor对象
      html: '<p></p>', // 编辑器的数据
      toolbarConfig: {
        // 自定义显示哪些菜单
        toolbarKeys: [
          // 菜单 key
          'headerSelect', // 正文标题
          'blockquote', // 引用
          'bold', // 粗体
          'fontSize', // 字号
          'fontFamily', // 字体
          'italic', // 斜体
          'underline', //下划线
          'through', // 删除线
          'color', // 文字颜色
          'bgColor', // 背景颜色
          'insertLink', // 插入链接
          'bulletedList', // 无序列表
          'numberedList', // 有序列表
          'justifyLeft', // 左对齐
          'justifyRight', // 右对齐
          'justifyCenter', // 居中对齐
          'justifyJustify', // 两端对齐
          'emotion', // 表情
          'insertImage', // 插入图片
          'insertTable', // 插入表格
          'deleteTable', // 删除表格
          'codeBlock', // 插入代码块
          'undo', // 撤销
          'redo', // 重做
        ],
        // excludeKeys: [ /* 隐藏哪些菜单 */ ],
      },
      editorConfig: {
        placeholder: '请输入内容...',
        // autoFocus: false,
        // 所有的菜单配置，都要在 MENU_CONF 属性下
        MENU_CONF: {},
      },
    }
  },
  watch: {
    EditData(newVal) {
      this.html = newVal
    },
  },
  methods: {
    // 创建编辑器菜单栏
    onCreated(editor) {
      this.editor = Object.seal(editor) // 【注意】一定要用 Object.seal() 否则会报错
      // console.log(this.editor.getAllMenuKeys());
    },
    // onChange 时获取编辑器最新内容
    onChange(editor) {
      this.html = editor.getHtml()
      this.$emit('onEditor', this.html)
    },
  },
  mounted() {
    // 模拟 ajax 请求，异步渲染编辑器
    // setTimeout(() => {
    //     this.html = '<p>Ajax 异步设置内容 HTML</p>'
    // }, 1500)
  },
  beforeDestroy() {
    const editor = this.editor
    if (editor == null) return
    editor.destroy() // 组件销毁时，及时销毁 editor ，重要！！！
  },
}
</script>

<style lang="less" scoped></style>
