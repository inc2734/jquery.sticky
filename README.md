# jquery.sticky

## Get started

### Install
```
$ yarn add jquery.sticky
```

### Load scripts

```
<script src="https://code.jquery.com/jquery-1.12.0.min.js"></script>
<script src="/node_modules/jquery.sticky/dist/jquery.sticky.min.js"></script>
<link rel="stylesheet" href="/node_modules/jquery.sticky/dist/sticky.css">
```

### Setting

```
<script>
jQuery(function($) {
  $('.sidebar').sticky({
    berakpoint: 1024, // Optional. over 1024px, fired
    offset: 0 // Optional
  });
});
</script>
```

## License
MIT
