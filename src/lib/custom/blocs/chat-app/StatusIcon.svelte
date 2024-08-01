<script>
    export let connected = false;
  </script>
  
  <style>
    .icon {
      height: 8px;
      width: 8px;
      border-radius: 50%;
      display: inline-block;
      background-color: #e38968;
      margin-right: 6px;
    }
  
    .connected {
      background-color: #86bb71;
    }
  </style>
  
  <i class="icon" class:connected={connected}></i>
  