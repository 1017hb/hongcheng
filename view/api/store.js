import request from "./../utils/request.js";

/**
 * 品牌图片
 */
export function logo_banner(){
      return  request.get('brand/logo',  {},  {  noAuth:  true  });
}
/**
 * 促销商品
 */
export function promotion(page){
  return request.get("Promotion/" + page,  {}, { noAuth: true });
}
/***
 * 今日上新
 */
export function today_product(){
  return  request.get("today_product" ,{}, { noAuth: true });
}
/**
 * 品牌轮播图片
 */
export  function  brand_rotation(brand_id)  {
  return request.get('brand_rotation/' + brand_id, {}, { noAuth: true });
}
/**
 * 首页商品分类
 *
 */
export function fashion_list() {
  return request.get('Top_classification', {}, { noAuth: true });
}
/**
 * 商品分类数据
 */
export function fashionData(type_id, page) {
  return request.get('Secondary_classification', { type_id: type_id, page: page }, { noAuth: true });
}
/**
 * 商品分类商品
 */
export function fashionGoods(type_id, page) {
  return request.get('Ctype_product', { type_id: type_id, page: page }, { noAuth: true });
}

/**
 * 品牌分类
 */
export function brand_productTwo(brand_id, page) {
  return request.get('getbrandbyproduct_2', { brand_id: brand_id, page: page }, { noAuth: true });
}

export  function  brand_product(brand_id,  page)  {
   return  request.get('getbrandbyproduct',  {  brand_id:  brand_id,  page:  page  },  {  noAuth:  true  });
}

/**
 * 
 * 产品相关接口
 * 
*/
export function brand_list(){
  return request.get('brand_list', {}, { noAuth: true });
}
/**
 * 获取推荐产品
 * 
 */
export function getProductHot(page,limit) {
  return request.get("product/hot", { 
    page: page === undefined ? 1 : page, 
    limit:limit === undefined ? 4 :limit
  },{noAuth:true});
}

/**
 * 购车添加
 * 
*/
export function postCartAdd(data) {
  return request.post('cart/add', data);
}

/**
 * 获取收藏列表
 * @param object data
*/
export function getCollectUserList(data) {
  return request.get('collect/user', data)
}

/**
 * 批量收藏
 * 
 * @param object id  产品编号 join(',') 切割成字符串
 * @param string category 
*/
export function collectAll(id, category) {
  return request.post('collect/all', { id: id, category: category === undefined ? 'product' : category });
}

/**
 * 删除收藏产品
 * @param int id
 * @param string category product=普通产品,product_seckill=秒杀产品
*/
export function collectDel(id, category) {
  return request.post('collect/del', { id: id, category: category === undefined ? 'product' : category });
}

/**
 * 添加收藏
 * @param int id
 * @param string category product=普通产品,product_seckill=秒杀产品
*/
export function collectAdd(id, category){
  return request.post('collect/add', { id: id, 'product': category === undefined ? 'product' : category });
}

/**
 * 获取产品详情
 * @param int id
 * 
*/
export function getProductDetail(id){
  return request.get('product/detail/' + id, {}, { noAuth : true });
}

/**
 * 产品分享二维码 推广员
 * @param int id
*/
export function getProductCode(id){
  return request.get('product/code/' + id, { user_type:'routine'});
}

/**
 * 获取产品评论
 * @param int id
 * @param object data
 * 
*/
export function getReplyList(id,data){
  return request.get('reply/list/'+id,data)
}

/**
 * 产品评价数量和好评度
 * @param int id
*/
export function getReplyConfig(id){
  return request.get('reply/config/'+id);
} 

/**
 * 获取分类列表
 * 
*/
export function getCategoryList(){
  return request.get('category', {}, { noAuth:true})
}

export function brand() {
  return request.get('brand', {}, { noAuth: true })
}

/**
 * 获取产品列表
 * @param object data
*/
export function getProductslist(data){
  return request.get('products',data,{noAuth:true});
}

/**
 * 首页产品的轮播图和产品信息
 * @param int type 
 * 
*/
export function getGroomList(type,page){
  return request.get('groom/list', {type:type,page:page},{noAuth:true});
}

/**
 * 获取搜索关键字获取
 * 
*/
export function getSearchKeyword(){
  return request.get('search/keyword',{},{noAuth:true});
}