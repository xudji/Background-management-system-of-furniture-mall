export default {
  data() {
    return {
      uploadFileOss: '/lejuAdmin/material/uploadFileOssSave',
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