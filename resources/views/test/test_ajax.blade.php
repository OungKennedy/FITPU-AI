<html>
   <head>
      <meta name="csrf-token" content="{{ csrf_token() }}">

      <title>Ajax Example</title>
      
      <!-- script src = "https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js">
      </script -->
      <script src="/tus-js-lib/jquery-2.1.4.min.js"></script>
      
      <script>
         function getMessage() {
            $.ajaxSetup({
               headers: 
               {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
               }
            });            
            $.ajax({
               type:'POST',
               url:'/getAjaxMsg',
               data:'_token = <?php echo csrf_token() ?>',
               success:function(data){
                  $("#msg").html(data.msg);
               }
            });
         }
      </script>
   </head>
   
   <body>
      <div id = 'msg'>This message will be replaced using Ajax. 
         Click the button to replace the message.</div>
      <?php
         echo Form::button('Replace Message',['onClick'=>'getMessage()']);
      ?>
   </body>

</html>
