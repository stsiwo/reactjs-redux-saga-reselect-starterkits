# Redux Saga & Selecoters

## Redux Saga

## Selecoters

### pure selectors

### reselect (3rd party library)

#### Cache Features & Sharing The Same Reselector

  - Reselect library decide if it should use cache or not is based on the input of reselector function. if the input was not changed, it returned cache, otherwise, recalculate.

  - you can return new object or mutated object, it does not affect the cache feature. the cache is based on the input of the reselector function (see above statement). 

  - it has cache (size 1) capability. so if its particular portion of state tree hasn't change, it returns cached value. However, if multiple component instances use the same memorized selector instance, you CAN'T use this cache features. since the memorized selector recognized that revieved arguments are different every time when it is called. Therefore, you have to give a copy of momerized selector to each component instance. (I'm not sure it is true when using redux-saga though)

  - you don't need to use memorized selecotr inside redux-saga (read here: https://alexnitta.com/understanding-reselect-and-re-reselect/)




 
