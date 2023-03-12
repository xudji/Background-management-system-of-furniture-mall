export default {
  data() {
    return {
      uploadFileOss: '/lejuAdmin/material/uploadFileOssSave',
      uploadUrl1: '/lejuAdmin/material/uploadFileOss', //当前接口用于通用上传到oss,不保存至数据库 除了素材管理都用此接口 
      uploadUrl: '/lejuAdmin/material/uploadFileOssSave', //素材被上传到oss,同时保存至数据库
      uploadHeaders: {
        token: getToken()
      },
      pagniationParams: {
        start: 1,
        limit: 10,
        totalNum: 0,
        pageSizes: [10, 20, 30, 40]
      },

    }
  },
  
  computed: {
    token() {
      return {
        // eslint-disable-next-line no-undef
        token: getToken()
      }
    }
  }
}
import { getToken } from '@/utils/myAuth'