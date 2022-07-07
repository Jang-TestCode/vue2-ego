<template>
  <el-upload
    class="upload-demo"
    ref="upload"
    action="http://127.0.0.1:3000/api/upload"
    :file-list="fileList"
    :auto-upload="false"
    :on-success="headerSuccess"
  >
    <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
    <el-button style="margin-left: 10px" size="small" type="success" @click="submitUpload">
      上传到服务器
    </el-button>
    <div slot="tip" class="el-upload__tip">目前仅支持3张图片的上传</div>
  </el-upload>
</template>

<script>
export default {
  data() {
    return {
      fileList: [],
    }
  },
  methods: {
    headerSuccess(response) {
      this.$emit('onUpload', response)
    },
    submitUpload() {
      this.$refs.upload.submit()
    },
  },
}
</script>

<style lang="less" scoped></style>
