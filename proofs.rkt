#lang racket
; null is the empty list
; lists are normally (a (b (c null))) in lisp
; list = null or (pair item list)

; renaming cons, car, and cdr to names I like better
(define pair cons)
(define head car)
(define tail cdr)

; abstract interface for numbers
; add-one, subtract-one, equals, zero
(define zero null)
(define is-zero null?)
(define (add-one n) (pair 's n))
(define (subtract-one n) (tail n))

(define (equals a b)
  (or
   (and (is-zero a) (is-zero b))
   (equals (subtract-one a) (subtract-one b))))


       
  




(define (get-new-prime primes)
  (smallest-factor (sum (set-product primes) 1)))

(define (is-prime n)
  (not (foldl or
             (map (lambda (a) (divides? a n))
                  (range 2 n)))))


  
(define (set-product numbers)
  (foldl product numbers))



; for x in first
; for y in second
; result.add(product(x,y))

(define (smallest-factor n) 0)
(define (sum a b) (+ a b))


; return a list of (low, low + 1, ... high - 1)
(define (range low high)
  (if (less-or-equal high low) null
      (pair low (range (inc low) high))))

(define (inc n) (+ n 1))
(range 2 7)
  
