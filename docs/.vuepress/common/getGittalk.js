export default ({
  pages
}) => {

  const path = window.location.pathname

  // 获取当前页面信息
  // filter() 方法创建一个新数组, 其包含通过所提供函数实现的测试的所有元素。 
  const dist = pages.filter(item => {
    return item.path === path
  })[0]
  const page = document.querySelector('.page-nav')
  // 直接引入
  const linkGitalk = document.createElement('link');
  linkGitalk.href = 'https://cdn.jsdelivr.net/npm/gitalk@1/dist/gitalk.css';
  linkGitalk.rel = 'stylesheet';
  document.body.appendChild(linkGitalk);

  const scriptGitalk = document.createElement('script');
  scriptGitalk.src = 'https://cdn.jsdelivr.net/npm/gitalk@1/dist/gitalk.min.js';
  document.body.appendChild(scriptGitalk);


  scriptGitalk.onload = () => {
    let gitalk = document.createElement('div')
    gitalk.id = 'gitalk-container'
    page.appendChild(gitalk)
    var _gitalk = new Gitalk({
      clientID: '869b2dea1c53cc9b6ddd', // 填入你的clientID
      clientSecret: '0416acb02689088d4d2c55243a82db0582af4575', // 填入你的clientSecret
      repo: 'vuepress-blog', // 填入你的存储评论的仓库名字
      owner: 'qiufeihong2018', //你的用户名
      admin: ['qiufeihong2018'], // 你的用户名
      id: decodeURI(path), // 每个页面根据url生成对应的issue，保证页面之间的评论都是独立的
    })
    _gitalk.render('gitalk-container')
  }
}
