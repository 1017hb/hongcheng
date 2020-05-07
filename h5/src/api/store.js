import request from "@utils/request";
/**
 * 品牌推荐图片
 */
export function logo_banner(){
      return  request.get('brand/logo',  {},  {  login: false  });
}

/**
 * 商品分类商品
 */
export function fashionGoods(type_id, page) {
  return request.get('Ctype_product', { type_id: type_id, page: page }, { login: false });
}

/**
 * 商品分类数据
 */
export function fashionData(type_id, page) {
  return request.get('Secondary_classification', { type_id: type_id, page: page }, { login: false });
}

/**
 * 品牌商品
 * @param {Object} brand_id
 * @param {Object} page
 */
export  function  brand_product(brand_id,  page)  {
   return  request.get('getbrandbyproduct',  {  brand_id:  brand_id,  page:  page  }, { login: false });
}

/**
 * 品牌轮播图片
 */
export  function  brand_rotation(brand_id)  {
  return request.get('/brand_rotation/' + brand_id, {}, { login: false });
}

/**
 * 促销商品
 */
export function promotion_list(page){
  return request.get("/Promotion/" + page,  {}, { login: false });
}

/**
 * 商品分类(新)
 * */
export function fashion_list() {
  return request.get('/Top_classification', {}, { login: false });
}

/**
 * 品牌分类
 * */
export function brand_list(){
  return request.get('/brand_list', {}, { login: false });
}

/*
 * 商品分类
 * */
export function getCategory() {
  return request.get("/category", {}, { login: false });
}

/*
 * 商品详情
 * */
export function getProductDetail(id) {
  return request.get("/product/detail/" + id, {}, { login: false });
}

/*
 * 商品分销二维码
 * */
export function getProductCode(id) {
  return request.get("/product/code/" + id, {}, { login: true });
}

/*
 * 商品列表
 * */
export function getProducts(q) {
  return request.get("/products", q, { login: false });
}

/*
 * 购物车数量
 * */
export function getCartNum() {
  return request.get("/cart/count");
}

/*
 * 添加收藏
 * */
export function toCollect(id, category) {
  return request.get("/collect/add/" + id + "/" + category);
}

/*
 * 为你推荐
 * */
export function getHostProducts(page, limit) {
  return request.get(
    "/product/hot",
    { page: page, limit: limit },
    { login: false }
  );
}

/*
 * 精品、热门、首发列表
 * */
export function getGroomList(type) {
  return request.get("/groom/list/" + type, {}, { login: false });
}

/*
 * 购物车 添加
 * */
export function postCartAdd(data) {
  return request.post("/cart/add", data);
}

/*
 * 购物车列表
 * */
export function getCartList() {
  return request.get("/cart/list");
}

/*
 * 购物车 删除
 * */
export function postCartDel(ids) {
  return request.post("/cart/del", { ids });
}

/*
 * 购物车 获取数量
 * */
export function getCartCount(data) {
  return request.get("/cart/count", data);
}

/*
 * 购物车 修改商品数量
 * */
export function changeCartNum(id, number) {
  return request.post("/cart/num", { id, number });
}

/**
 * 搜索推荐关键字
 */
export function getSearchKeyword() {
  return request.get("/search/keyword", {}, { login: false });
}

/**
 * 产品评论列表
 */
export function getReplyList(id, q) {
  return request.get("/reply/list/" + id, q, { login: false });
}

/**
 * 产品评价数量和好评度
 */
export function getReplyConfig(id) {
  return request.get("/reply/config/" + id, {}, { login: false });
}

/**
 * 评价页面获取单个产品详情
 */
export function postOrderProduct(unique) {
  return request.post("/order/product", { unique }, { login: false });
}

/**
 * 提交评价页面；
 */
export function postOrderComment(data) {
  return request.post("/order/comment", data, { login: false });
}
