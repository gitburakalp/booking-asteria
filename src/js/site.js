let root = document.documentElement;
let lang = document.querySelector('html').getAttribute('lang');
let jsFormat = lang == 'en' ? 'DD.MM.YYYY' : 'MM.DD.YYYY';
let ww = window.outerWidth;
let today = new Date();

function setHeaderFooterHeights() {
  var header = document.querySelector('header');
  var footer = document.querySelector('footer');

  root.style.setProperty('--hh', header.offsetHeight + 'px');
  root.style.setProperty('--fh', footer.offsetHeight + 'px');
}

function setDatepickers() {
  $('.datepicker').each(function () {
    var ww = $(window).outerWidth();
    var $this = $(this);
    var isSinglepicker = $this.hasClass('is-singlepicker');
    var isChildpicker = $this.hasClass('is-childpicker');
    var isHoneymooners = $this.hasClass('is-honeymooners');
    var yearSelectVal = false;
    var momentYear = moment().get('year');

    if (isSinglepicker && isChildpicker) {
      yearSelectVal = [momentYear - 17, momentYear];
    } else if (isSinglepicker && isHoneymooners) {
      yearSelectVal = [momentYear - 1, momentYear];
    } else if (isSinglepicker) {
      yearSelectVal = [1950, momentYear];
    }

    var config = {
      startDate: isSinglepicker ? false : moment(today).format(jsFormat),
      autoClose: true,
      format: jsFormat,
      language: lang,
      inline: false,
      startOfWeek: 'monday',
      container: $this.parent(),
      customArrowPrevSymbol: '<i class="icons icons--prev">Prev</i>',
      customArrowNextSymbol: '<i class="icons icons--next">Next</i>',
      ignoreReadonly: true,
      separator: ' - ',
      stickyMonths: true,
      showShortcuts: true,
      shortcuts: {
        'Delete Dates': function () {},
      },
      customOpenAnimation: function (cb) {
        $(this).fadeIn(300, cb);
      },
      customCloseAnimation: function (cb) {
        $(this).fadeOut(300, cb);
      },
      setValue: function (s) {
        if ($(this).attr('readonly') || (!$(this).is(':disabled') && s != $(this).val())) {
          $(this).val(s);
          $this.parent().addClass('has-value');
          $this.parent().addClass('is-selected');

          if (s.includes('-')) {
            $(this).parent().find('#inpCheckinDate').val(s.split('-')[0].trim());
            $(this).parent().find('#inpCheckoutDate').val(s.split('-')[1].trim());
          }
        }
      },
    };

    if (ww > 767) {
      config['singleMonth'] = isSinglepicker;
      config['singleDate'] = isSinglepicker;
      config['singleDate'] = isSinglepicker;
      config['monthSelect'] = isSinglepicker;
      config['yearSelect'] = isSinglepicker;
    }

    $this.dateRangePicker(config);
  });
}

function setMinusPlus() {
  $('.minus-plus-buttons').on('click', function () {
    var $this = $(this);
    var $closestRow = $this.closest('[class*=row]');
    var $el = $closestRow.find('span[id*=Count]');

    var isMinus = $this.hasClass('minus');
    var elValue = parseInt($el.text());
    var maxValue = $closestRow.data('max');
    var isChild = $el.attr('id').includes('child');
    var minValue = isChild ? 0 : 1;

    if (isMinus) {
      if (elValue > minValue) $el.text(--elValue);
    } else {
      if (elValue < maxValue) $el.text(++elValue);
    }

    $el.trigger('change');
    $el.closest('.select-box').addClass('has-value');

    if (isChild) {
      if (elValue > 0) {
        var arr = ['', '1', '2', '3'];

        $('.child-row').removeClass('d-none');

        for (index in arr) {
          let element = $(`.child-row .child-${arr[index]}`);
          if (index <= elValue && elValue > 0) element.removeClass('d-none');
          else element.addClass('d-none');
        }
      } else {
        $('.child-row').addClass('d-none');
      }
    }
  });
}

function setRoomImageSlider() {
  $('.owl-carousel').each(function () {
    $(this).owlCarousel({
      loop: true,
      responsive: {
        0: {
          items: 1,
          margin: 10,
        },
      },
    });
  });
}

function setPopovers() {
  $("[data-toggle='popover']").each(function () {
    var $this = $(this);
    var isDailyRates = $this.hasClass('is-daily-rates');
    var placement = isDailyRates ? 'bottom' : 'top';
    var popoverClass = isDailyRates ? 'daily-rates' : '';

    var customContent = `
    <div class='row'>
      <div class='col'>
        <h4 class='title'>DATES</h4>
      </div>
      <div class='col text-right'>
        <h4 class='title'>RATES</h4>
      </div>
    </div>
    <div class='form-row box-bordered'>
      <div class='col-6'>
        <span class='date'>04.01.2021</span>
        <span class="day">
          Thursday
        </span>
      </div>
      <div class='col-6 text-right'>
        <span class="amount--old">
          4,306 EUR
        </span>
        <span class="amount">
          3,955 EUR
        </span>
      </div>
    </div>
    <div class='form-row box-bordered'>
      <div class='col-6'>
        <span class='date'>05.01.2021</span>
        <span class="day">
          Friday
        </span>
      </div>
      <div class='col-6 text-right'>
        <span class="amount--old">
          4,306 EUR
        </span>
        <span class="amount">
          3,955 EUR
        </span>
      </div>
    </div>
    <div class='form-row box-bordered'>
      <div class='col-6'>
        <span class='date'>06.01.2021</span>
        <span class="day">
          Saturday
        </span>
      </div>
      <div class='col-6 text-right'>
        <span class="amount--old">
          4,306 EUR
        </span>
        <span class="amount">
          3,955 EUR
        </span>
      </div>
    </div>
    <div class='form-row box-bordered'>
      <div class='col-6'>
        <span class='date'>07.01.2021</span>
        <span class="day">
          Sunday
        </span>
      </div>
      <div class='col-6 text-right'>
        <span class="amount--old">
          4,306 EUR
        </span>
        <span class="amount">
          3,955 EUR
        </span>
      </div>
    </div>
    <div class='form-row box-bordered'>
      <div class='col-6'>
        <span class='date'>08.01.2021</span>
        <span class="day">
          Monday
        </span>
      </div>
      <div class='col-6 text-right'>
        <span class="amount--old">
          4,306 EUR
        </span>
        <span class="amount">
          3,955 EUR
        </span>
      </div>
    </div>
    `;

    $this.data('content', customContent); //Gerçek data gelince silinecek.

    var config = {
      container: 'body',
      html: true,
      trigger: 'focus',
      placement: placement,
      template:
        '<div class="popover ' +
        popoverClass +
        '" role="tooltip">' +
        (isDailyRates ? '' : '<div class="arrow"></div>') +
        '<h3 class="popover-header"></h3><div class="popover-body ' +
        popoverClass +
        '"></div></div>',
    };

    $this.popover(config);
  });

  $('[data-toggle="popover"]').on({
    'show.bs.popover': function (e) {
      var $target = $(e.currentTarget);
      $('body').addClass('popover-is-shown');
      $target.addClass('popover-is-active');
    },
    'hidden.bs.popover': function (e) {
      var $target = $(e.currentTarget);
      $('body').removeClass('popover-is-shown');
      $target.removeClass('popover-is-active');
    },
  });
}

function setRadioListTabs() {
  $('.radio-lists').each(function () {
    $(this)
      .find('label')
      .on('click', function () {
        var $this = $(this);
        var dataId = $this.prev().data('id');
        var activeCss = 'is-active';

        $('.radio-lists-item').removeClass(activeCss);
        $this.closest('.radio-lists-item').addClass(activeCss);

        $('.radio-lists-contents > *').removeClass(activeCss);
        $(`.radio-lists-contents #${dataId}`).addClass(activeCss);
      });
  });

  $('.custom-check input').on('change', function () {
    $('.custom-check').removeClass('is-active');
    $(this).parent().addClass('is-active');
  });
}

function isOwnHeaderSelectClicked(evt, selfObj) {
  return (
    selfObj.contains(evt.target) ||
    evt.target == selfObj ||
    (selfObj.childNodes != undefined && $.inArray(evt.target, selfObj.childNodes) >= 0)
  );
}

function outsideClickClose(evt) {
  var box = document.querySelector('.header-select.is-active');

  if (!isOwnHeaderSelectClicked(evt, $(box)[0])) {
    if ($(box).is(':visible')) $(box).removeClass('is-active');
  }
}

document.addEventListener('DOMContentLoaded', function () {
  var hasSearch = $('body').hasClass('has-search');

  //loading htmlComponents -> purehtml

  $('header').each(function () {
    var headerComponent = hasSearch
      ? 'html-components/header-search.html'
      : 'html-components/header.html';

    $(this).load(headerComponent);
  });

  $('footer').each(function () {
    !hasSearch ? $(this).load('html-components/footer.html') : '';
  });
});

window.onload = function () {
  $('body').addClass('is-loaded');

  $('.btn-primary').each(function () {
    $(this).attr('href', $('.btn--continue').attr('href'));
  });

  setHeaderFooterHeights();
  setDatepickers();
  setMinusPlus();
  setRadioListTabs();

  $('.hotel-select').each(function () {
    $('input[type=radio]').change(function () {
      var $this = $(this);

      $('.hotel-select .custom-check').removeClass('is-active');
      $this.parent().addClass('is-active');
      $this.closest('.header-select').find('#inpSelectedHotel').val($this.next().text());
    });
  });

  $(document).on('click.header-select', outsideClickClose);

  $('.header').each(function () {
    $('.is-active').each(function () {
      $(this)
        .prevAll()
        .each(function () {
          $(this).addClass('is-past');
        });
    });
  });

  for (let i = 1; i < 6; i++) {
    $('.search-steps__results').append(
      "<div class='room-cards'>" + $('.room-cards').html() + '</div>',
    );
  }

  setPopovers();

  $('.adults-child-popover #adultCount,.adults-child-popover #childCount').change(function () {
    var $this = $(this);
    var $popover = $('.adults-child-popover');
    var $el = $this.closest('.adults-child-popover').prev();

    var childCount = $popover.find('#childCount').text();

    if (childCount < 1) {
      $el.val($popover.find('.row:nth-child(1)').text().trim());
    } else {
      $el.val(
        $popover.find('.row:nth-child(1)').text().trim() +
          ', ' +
          $popover.find('.row:nth-child(2)').text().trim(),
      );
    }
  });

  $('.header-select').on('click', function () {
    var activeClass = 'is-active';

    $('.header-select').removeClass(activeClass);
    $(this).addClass(activeClass);
  });

  $('#inpDiffBilling').on('change', function () {
    $(this).closest('.form-row').siblings('#billingInformationBlock').toggleClass('d-none');
  });

  setRoomImageSlider();

  $('.reservation-budget').on('click', function () {
    $(this).parent().addClass('is-shown');
  });

  if (ww < 1200) {
    $('.reservation-summary')
      .find('.close-btn')
      .on('click', function () {
        $(this).parent().removeClass('is-shown');
      });
  }
};
