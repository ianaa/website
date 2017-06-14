$(document).ready(() => {
  // Cache selectors
  let lastSection = '#about';
  const topMenu = $('#top-menu');
  const topMenuHeight = $('.mdl-layout__header').outerHeight();
  const lastOffset = 0;
  // All list items
  const menuItems = topMenu.find('a');
  // All drawer links
  const drawer = $('.mdl-layout__drawer');
  const drawerItems = drawer.find('a');
  const cont = $('.mdl-layout__content');
  // Anchors corresponding to menu items
  const scrollItems = menuItems.map(function () {
    const item = $($(this).attr('href'));
    if (item.length) { return item; }
  });


  function scrollToSection(e) {
    const href = $(this).attr('href');
    if (lastSection === href) {
      return;
    }
    let offsetTop;
    if (href === '#') {
      offsetTop = 0;
    } else if ($(href).length) {
      offsetTop = cont.scrollTop() + $(href).position().top;
    }
    $('.mdl-layout__content').stop().animate({
      scrollTop: offsetTop,
    }, 300);
    lastSection = href;
    // lastOffset = $(href).offset().top;
    e.preventDefault();
  }

  function closeDrawer() {
    const d = document.querySelector('.mdl-layout');
    d.MaterialLayout.toggleDrawer();
  }

  function addActiveClass(target) {
    console.log('called');
    const tabActive = document.querySelector('.mdl-layout__tab.is-active');
    tabActive.classList.remove('is-active');
    const tab = document.querySelector(`.mdl-layout__tab[href='#${target}'`);
    tab.classList.add('is-active');
  }

  // Bind click handler to menu items
  // so we can get a fancy scroll animation

  menuItems.click(scrollToSection);

  drawerItems.click((e) => {
    closeDrawer();
    scrollToSection(e);
  });


  // Bind to scroll
  $('.mdl-layout__content').scroll(function () {
    // Get container scroll position
    const fromTop = $(this).scrollTop() + topMenuHeight;

    // Get id of current scroll item
    let cur = scrollItems.map(function () {
      if (cont.scrollTop() + $(this).position().top < fromTop) { return this; }
    });
    // Get the id of the current element
    cur = cur[cur.length - 1];

    const id = cur && cur.length ? cur[0].id : '';

    if (lastSection !== id) {
      lastSection = id;
      // Set/remove active class
      addActiveClass(id);
    }
  });
});
