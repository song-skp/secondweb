// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
  // 导航菜单高亮
  highlightActiveMenu();
  
  // 联系表单验证
  initializeContactForm();
  
  // 新闻分类筛选
  initializeNewsCategories();
  
  // 初始化分页
  initializePagination();
  
  // 回到顶部按钮
  initializeScrollToTop();
});

/**
 * 导航菜单高亮当前页面
 */
function highlightActiveMenu() {
  // 获取当前页面的URL路径
  const currentPath = window.location.pathname;
  
  // 获取所有导航链接
  const navLinks = document.querySelectorAll('nav ul li a');
  
  // 遍历所有链接，根据当前路径设置活跃状态
  navLinks.forEach(link => {
    const linkPath = link.getAttribute('href');
    if (currentPath.endsWith(linkPath)) {
      link.classList.add('active');
    } else if (currentPath === '/' && linkPath === 'index.html') {
      link.classList.add('active');
    }
  });
}

/**
 * 联系表单验证
 */
function initializeContactForm() {
  const contactForm = document.getElementById('contactForm');
  if (!contactForm) return;
  
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // 获取表单字段
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value.trim();
    const captcha = document.getElementById('captcha').value.trim();
    
    // 验证字段
    let isValid = true;
    let errorMessage = '';
    
    if (name === '') {
      isValid = false;
      errorMessage += '请输入您的姓名\n';
    }
    
    if (phone === '') {
      isValid = false;
      errorMessage += '请输入您的联系电话\n';
    }
    
    if (email === '') {
      isValid = false;
      errorMessage += '请输入您的电子邮箱\n';
    } else if (!isValidEmail(email)) {
      isValid = false;
      errorMessage += '请输入有效的电子邮箱地址\n';
    }
    
    if (subject === '') {
      isValid = false;
      errorMessage += '请选择留言主题\n';
    }
    
    if (message === '') {
      isValid = false;
      errorMessage += '请输入留言内容\n';
    }
    
    if (captcha === '') {
      isValid = false;
      errorMessage += '请输入验证码\n';
    }
    
    if (!isValid) {
      alert('表单填写有误：\n' + errorMessage);
      return;
    }
    
    // 表单验证通过，模拟提交
    alert('感谢您的留言，我们将尽快与您联系！');
    contactForm.reset();
  });
  
  // 刷新验证码按钮
  const refreshButton = document.querySelector('.captcha-refresh');
  if (refreshButton) {
    refreshButton.addEventListener('click', function() {
      alert('验证码已刷新');
    });
  }
}

/**
 * 验证邮箱格式
 * @param {string} email - 邮箱地址
 * @returns {boolean} - 邮箱格式是否有效
 */
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * 新闻分类筛选
 */
function initializeNewsCategories() {
  const categories = document.querySelectorAll('.category');
  const newsItems = document.querySelectorAll('.news-item');
  
  if (!categories.length || !newsItems.length) return;
  
  categories.forEach(category => {
    category.addEventListener('click', function(e) {
      e.preventDefault();
      
      // 移除所有类别的活跃状态
      categories.forEach(cat => cat.classList.remove('active'));
      
      // 设置当前类别为活跃
      this.classList.add('active');
      
      // 获取当前选中的类别
      const selectedCategory = this.textContent.trim();
      
      // 筛选新闻项
      newsItems.forEach(item => {
        const itemCategory = item.querySelector('.news-category')?.textContent.trim();
        
        if (selectedCategory === '全部' || selectedCategory === itemCategory) {
          item.style.display = 'grid';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

/**
 * 初始化分页
 */
function initializePagination() {
  const paginationLinks = document.querySelectorAll('.pagination-num, .pagination-prev, .pagination-next');
  
  if (!paginationLinks.length) return;
  
  paginationLinks.forEach(link => {
    if (link.classList.contains('disabled')) return;
    
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      // 模拟分页，实际应用中会加载对应页面的内容
      if (this.classList.contains('pagination-num')) {
        // 移除所有页码的活跃状态
        document.querySelectorAll('.pagination-num').forEach(num => num.classList.remove('active'));
        
        // 设置当前页码为活跃
        this.classList.add('active');
        
        // 根据页码更新前后翻页按钮状态
        const pageNum = parseInt(this.textContent);
        const prevButton = document.querySelector('.pagination-prev');
        const nextButton = document.querySelector('.pagination-next');
        const totalPages = document.querySelectorAll('.pagination-num').length;
        
        if (prevButton) {
          if (pageNum === 1) {
            prevButton.classList.add('disabled');
          } else {
            prevButton.classList.remove('disabled');
          }
        }
        
        if (nextButton) {
          if (pageNum === totalPages) {
            nextButton.classList.add('disabled');
          } else {
            nextButton.classList.remove('disabled');
          }
        }
      } else if (this.classList.contains('pagination-prev')) {
        // 前一页
        const activeNum = document.querySelector('.pagination-num.active');
        if (activeNum) {
          const prevNum = activeNum.previousElementSibling;
          if (prevNum && prevNum.classList.contains('pagination-num')) {
            prevNum.click();
          }
        }
      } else if (this.classList.contains('pagination-next')) {
        // 后一页
        const activeNum = document.querySelector('.pagination-num.active');
        if (activeNum) {
          const nextNum = activeNum.nextElementSibling;
          if (nextNum && nextNum.classList.contains('pagination-num')) {
            nextNum.click();
          }
        }
      }
      
      // 滚动到页面顶部
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });
}

/**
 * 初始化回到顶部按钮
 */
function initializeScrollToTop() {
  // 创建回到顶部按钮元素
  const scrollTopButton = document.createElement('button');
  scrollTopButton.className = 'scroll-top-btn';
  scrollTopButton.innerHTML = '↑';
  scrollTopButton.title = '回到顶部';
  
  // 添加样式
  scrollTopButton.style.position = 'fixed';
  scrollTopButton.style.bottom = '20px';
  scrollTopButton.style.right = '20px';
  scrollTopButton.style.width = '40px';
  scrollTopButton.style.height = '40px';
  scrollTopButton.style.borderRadius = '50%';
  scrollTopButton.style.backgroundColor = 'var(--primary-color)';
  scrollTopButton.style.color = 'var(--light-text)';
  scrollTopButton.style.border = 'none';
  scrollTopButton.style.fontSize = '20px';
  scrollTopButton.style.cursor = 'pointer';
  scrollTopButton.style.display = 'none';
  scrollTopButton.style.zIndex = '99';
  
  // 添加到页面
  document.body.appendChild(scrollTopButton);
  
  // 监听滚动事件
  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
      scrollTopButton.style.display = 'block';
    } else {
      scrollTopButton.style.display = 'none';
    }
  });
  
  // 点击事件
  scrollTopButton.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
} 