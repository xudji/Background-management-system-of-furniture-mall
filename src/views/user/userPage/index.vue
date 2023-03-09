<!--  -->
<template>
  <div class="user-userPage-main">
    <el-card shadow="never" class="card">
      <div class="main">
        <el-card shadow="never" class="main-left">
          <div class="user-userPage-avatar">
            <!-- 头像 -->
            <div class="user-avatar" align="center">
              <el-avatar style="width: 100px; height: 100px" size="large" :src="userInfo.icon" />
              <div class="text_center" style="font-size: 20px">
                {{ userInfo.username }}
              </div>
            </div>
            <div class="user-detail">
              <div> <i class="el-icon-collection-tag" /> 交互专家</div>
              <div> <i class="el-icon-s-check" /> 腾讯－某某某事业群－某某平台部－某某技术部－UED </div>
              <div> <i class="el-icon-location-outline" /> 深圳市南山区科技园科技中一路 </div>
            </div>
            <el-divider></el-divider>

            <div class="user-tag">
              <div style="margin-bottom:10px">标签</div>
              <el-tag :key="tag" v-for="tag in dynamicTags" closable :disable-transitions="false" size="mini"
                @close="deleteTag(tag)">
                {{ tag }}
              </el-tag>
              <el-input class="input-new-tag" v-show="isInput" v-model="tag" size="small" @blur="onInputBlur">
              </el-input>
              <el-button v-show="!isInput" size="mini" class="button-new-tag" @click="goAdd">+</el-button>

            </div>
            <el-divider></el-divider>
            <div class="user-group">
              <div class="team">
                <div v-for="item in teamList" :key="item.name" class="team-item">
                  <img style="margin-top: 10px; margin-right: 10px" :src="item.icon" class="teamImg" alt="">
                  {{ item.name }}
                </div>
              </div>
            </div>
          </div>
        </el-card>
        <el-card shadow="never" class="main-right">
          <el-tabs v-model="activeName">


            <el-tab-pane label="文章" name="first">


              <!-- 渲染v-for遍历整个 -->
              <div class="article_wrapper">
                <div v-for="(item, index) in article_list" :key="index" class="article_item">
                  <div class="text article_title">{{ item.title }}</div>
                  <div class="text article_tag">
                    <el-tag v-for="(tagItem, tagIndex) in item.tags" :key="tagIndex"
                      style="margin-right: 8px; margin-bottom: 8px" size="mini">{{ tagItem }}
                    </el-tag>
                  </div>
                  <div class="text article_content">{{ item.article }}</div>
                  <div class="text flexRight">
                    <span>{{ item.time }}</span>
                    <span style="margin-right: 10px">{{ item.author }}</span>
                  </div>
                  <div class="text article_icon">
                    <span><i class="el-icon-s-flag" /> {{ item.collection }}</span>
                    <span style="margin: 0 10px">丨</span>
                    <span><i class="el-icon-thumb" /> {{ item.good }}</span>
                    <span style="margin: 0 10px">丨</span>
                    <span><i class="el-icon-chat-line-round" />
                      {{ item.comment }}</span>
                  </div>
                </div>
              </div>

            </el-tab-pane>



            <el-tab-pane label="项目" name="second">


              <div class="product_wrapper">
                <el-row :gutter="20">
                  <el-col v-for="(proItem, proIndex) in product_list" :key="proIndex" :span="6" :offset="0">
                    <el-card shadow="hover" style="padding: 0" class="product_item">
                      <img style="width:100% ; height: 150px" :src="proItem.img" alt="">
                      <div style="margin-left: 5px" class="title">
                        {{ proItem.title }}
                      </div>
                      <div class="text" style="margin-top: 10px; font-size: 12px; margin: 4px">
                        {{ proItem.content }}
                      </div>
                      <div class="bottom">
                        <span style="font-size: 12px; color: gray; margin-left: 5px">
                          {{ proItem.time }}
                        </span>
                        <span style="margin-right: 5px" align="right">
                          <div class="img_group">
                            <img v-for="(imgItem, imgIndex) in proItem.visitorList" :key="imgItem"
                              :style="{ zIndex: imgIndex }" :src="imgItem" alt="">
                          </div>
                        </span>
                      </div>
                    </el-card>
                  </el-col>
                </el-row>


              </div>



            </el-tab-pane>
          </el-tabs>
        </el-card>

      </div>


    </el-card>

  </div>
</template>

<script>
import { getUserInfo } from '@/utils/myAuth'
import info from '../mixin/info';
export default {
  // data
  mixins: [info],
  name: 'UserPage',
  data() {
    return {
      dynamicTags:
        [
          '专业设计',
          '高颜值',
          '友善',
          '谦和',
          '技术大牛'
        ],
      inputVisible: false,
      isInput: false,
      tag: '',
      activeName: 'first'
    };
  },

  components: {},

  computed: {
    userInfo() {
      return getUserInfo()
    }
  },

  created() {
    console.log(this.userInfo)
    console.log(this.article_list)
    console.log(this.product_list)
  },

  mounted() {

  },

  methods: {
    goAdd() {
      this.isInput = true
    },
    deleteTag(item) {
      var index = this.dynamicTags.indexOf(item)
      this.dynamicTags.splice(index, 1)
    },
    onInputBlur() {
      this.isInput = false
      if (this.tag.trim()) {
        this.dynamicTags.push(this.tag.trim())
      } else {
        console.log('空')
      }
    }
  }
}


</script>
<style lang='scss' scoped>
.user-userPage-main {
  .card {
    margin: 30px;
    display: flex;
    justify-content: space-between;

    .main {
      display: flex;
      justify-content: space-between;

      .main-left {
        flex: none;

        .user-userPage-avatar {
          .user-group {
            .team {
              position: relative;
              display: flex;
              justify-content: space-between;
              flex-direction: row;
              flex-wrap: wrap;
              width: 400px;

              .team-item {
                display: flex;
                align-items: center;
                margin-bottom: 20px;
                height: 30px;
                width: 45%;
                font-size: 16px;

                .teamImg {
                  width: 25px;
                  height: 25px;
                  border-radius: 50%;
                }
              }
            }
          }

          .user-detail {
            display: flex;
            justify-content: space-between;
            align-items: left;
            flex-direction: column;
            height: 60px;
            font-size: 14px;
            margin-top: 20px;
          }

          .user-tag {
            width: 360px;

            .el-tag+.el-tag {
              margin: 10px 0px 0px 10px;
              white-space: normal;
              height: auto;
            }

            .button-new-tag {
              margin: 10px 0px 0px 10px;
              height: 20px;
              line-height: 18px;
              padding-top: 0;
              padding-bottom: 0;
            }

            .input-new-tag {
              width: 60px;
              height: 20px;
              margin: 10px 0px 0px 10px;
              vertical-align: middle;
            }
          }
        }
      }

      .main-right {
        margin-left: 20px;


        .article_wrapper {
          .article_item {
            position: relative;
            width: 100%;
            border-bottom: 1px dashed gray;
            padding-bottom: 10px;
            margin-bottom: 15px;

            .text {
              margin-bottom: 10px;
              color: rgba(0, 0, 0, 0.85);
              font-size: 16px;
            }

            .article_content {
              font-size: 14px;
            }

            .article_icon {
              font-size: 14px;
              color: rgba(0, 0, 0, 0.45);
              margin-bottom: 0;
            }

            .flexRight {
              display: flex;
              flex-direction: row-reverse;
              font-size: 13px;
              margin-top: 15px;
              color: rgba(0, 0, 0, 0.45);
              width: 100%;
            }
          }
        }

        .product_wrapper {
          display: flex;
          justify-content: center;

          .el-col {
            .bottom {
              display: flex;
              align-items: center;
              justify-content: space-between;
              height: 40px;

              .img_group {
                width: 100px;
                // background-color: red;
                height: 25px;

                img {

                  margin-left: -10px;
                  width: 20px;
                  height: 20px;
                  border-radius: 50%;

                }
              }

            }
          }
        }



      }
    }
  }
}
</style>

