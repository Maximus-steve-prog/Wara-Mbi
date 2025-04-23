jQuery(function() {
    // Enable resizing only from the right side
    jQuery("#contact").resizable({
      handles: 'e' // 'e' stands for east (right side)
    });


     // Fetch contacts from JSON
$.getJSON("contacts.json", function(data) {
    // Sort contacts by time (important: convert time to Date objects)
    data.sort(function(a, b) {
      return new Date(a.time) - new Date(b.time);
    });
  
    displayContacts(data);
  });
  
  // Function to display contacts
  function displayContacts(contacts) {
    $('#contact-list').empty(); // Clear the existing list
  
    $.each(contacts, function(index, contact) {
      const onlineDot = contact.status === "online" ? '<div class="absolute bottom-1 right-4 w-3 h-3 rounded-full bg-green-400 p-1"></div>' : '<div class="absolute bottom-1 right-4 w-3 h-3 rounded-full bg-gray-300"></div>';
  
      //Crucially, moved this inside the loop
      let unreadElement;
      if(contact.unread === 0){
          unreadElement = '<p style="display: none;"></p>'; //Use display: none for better UX
      }else{
          unreadElement = `<p class="text-blue-500 text-sm font-semibold bg-blue-200 rounded-full w-5 h-5 flex items-center justify-center">${contact.unread}</p>`;
      }
  
          // Extract only the time part (YYYY-MM-DDTHH:mm)
      const timeOnly = contact.time.substring(0, contact.time.indexOf('T') + 5);
  
  
      const contactItem = `
        <div class="contact-item cursor-pointer flex items-center border-b border-blue-200 py-2 hover:bg-gray-100 transition-colors duration-200 px-3 rounded-lg">
          <div class="relative">
            <img src="${contact.image}" alt="" class="w-16 h-16 object-cover border-gray-500 border rounded-full mr-3">
            ${onlineDot}
          </div>
          <div class="flex items-center justify-between flex-grow">
            <div class="contact-info">
              <h3 class="text-lg font-semibold">${contact.name}</h3>
              <p class="text-gray-500 truncate">${contact.message.substring(0, 40)}...</p>
            </div>
            <div class="text-right flex flex-col items-end">
              <p class="text-blue-400 text-sm">${timeOnly}</p>
              ${unreadElement}
            </div>
          </div>
        </div>`;
      $('#contact-list').append(contactItem);
    });
  
    // ... (rest of your click handling code)
    jQuery('.contact-item').on('click', function() {
        jQuery('#contact').addClass('hide');
        jQuery('.contact-item').removeClass('bg-gray-100');
        jQuery(this).addClass('bg-gray-100');
        jQuery('.chat-room').css({
          'display': 'flex',
          'top': '0%',
        })
      });
  }

    jQuery('#back').on('click', function() {
        jQuery('#contact').toggleClass('hide');
        jQuery('.chat-room').toggleClass('hide');
    });

   

    // Search/filter functionality
    jQuery('#search').on('input', function() {
        const searchTerm = $(this).val().toLowerCase();
        jQuery('.contact-item').each(function() {
            const contactName = $(this).find('h3').text().toLowerCase();
            jQuery(this).toggle(contactName.indexOf(searchTerm) > -1);
        });
    });

    // Click event to open chat window
    jQuery('.show-search').on('click', function() {
        // jQuery('#contact').toggleClass('hidden');
        jQuery('.search').css({
            'top': '0%'
        })
    });

    jQuery(document).on('click', function(event) {
        if (!jQuery(event.target).closest('.search').length && !jQuery(event.target).closest('.show-search').length) {
            jQuery('.search').css({
                'top': '-10%'
            });
        }
    });

    $('#darkModeToggle').click(function() {
        $('body').toggleClass('dark');
    });

});