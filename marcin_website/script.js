$(document).ready(() => {
  // ///////////////////
  // Dynamic content //
  // ///////////////////

  $.getJSON('data.json', (data) => {
    // About
    // const aboutParagraph = $('#about .mdl-card__supporting-text');
    // const lines = [];
    // data.about.content.split('\n').forEach((line) => {
    //   const p = $('<p />');
    //   p.text(line);
    //   lines.push(p);
    // });
    // aboutParagraph.append(lines);

    // Publications
    const publications = $('#publications .mdl-card__supporting-text');
    const entries = [];
    data.publications.forEach((category) => {
      const section = $('<div/>');
      const name = $(`<p class="mdl-cell mdl-cell--12-col mdl-card__title-text">${category.category}</p>`);
      const list = $('<div class="mdl-list "></div>');
      const items = [];


      category.items.forEach((item) => {
        const itemDiv = $('<div class="mdl-list__text"></div>');
        const year = $(`<div class="mdl-list__info">${item.year}</div>`);
        const title = $(`<div><a class="mdl_list__title" href="${item.pdf}" target="blank">${item.title}</a></div>`);
        if (item.links) {
          const links = [];
          item.links.forEach((link) => {
            const linkTag = $(`<a class="pubs-links" href="${link.url}" target="blank">[${link.type}]</a>`);
            links.push(linkTag);
          });
          title.append(links);
        }
        const authors = $(`<p class="mdl-list__subtitle">${item.authors}</p>`);
        itemDiv.append(year, title, authors);
        if (item.info) {
          itemDiv.append($(`<p class="mdl-list__subtitle">${item.info}</p>`));
        }
        if (item.press) {
          const press = [];
          item.press.forEach((link) => {
            const linkTag = $(`<a class="pubs-links" href="${link.url}" target="blank">${link.name}</a>`);
            press.push(linkTag);
          });
          itemDiv.append($('<div class="mdl-list__subtitle">Press coverage: </div>').append(press));
        }
        items.push(itemDiv);
      });
      list.append(items);

      // make show more button
      const button = $(`<div class="mdl-card__actions mdl-card--border">
          <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
            Show more
          </a>
        </div>`);
      section.append(name, list, button);
      entries.push(section);
    });
    publications.append(entries);
  });


  // //////////////////
  // Scroll spy //////
  // //////////////////

  // Cache selectors
  const topMenu = $('#top-menu');
  const topMenuHeight = $('.mdl-layout__header').outerHeight();
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
  let lastSection = '#about';


  function scrollToSection(e) {
    const href = $(e.target).attr('href');
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
    e.preventDefault();
  }

  function closeDrawer() {
    const d = $('.mdl-layout');
    d.MaterialLayout.toggleDrawer();
  }

  function addActiveClass(target) {
    const tabActive = $('.mdl-layout__tab.is-active');
    tabActive.removeClass('is-active');
    const tab = $(`.mdl-layout__tab[href='#${target}'`);
    tab.addClass('is-active');
  }

  // Bind click handler to menu items
  // so we can get a fancy scroll animation

  menuItems.click(scrollToSection);

  drawerItems.click((e) => {
    scrollToSection(e);
    closeDrawer(e);
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
