#lang racket
; null is the empty list
; lists are normally (a (b (c null))) in lisp
; list = null or (pair item list)

(define (get-new-prime primes)
  (smallest-factor (sum (product primes) 1)))

(define (is-prime n)
  (not (in (product (range 2 n) (range 2 n)) n)))



(define pair cons)
(define head car)
(define tail cdr)


; return a list of (low, low + 1, ... high - 1)
(define (range low high)
  (if (less-or-equal high low) null
      (pair low (range (inc low) high))))


  
