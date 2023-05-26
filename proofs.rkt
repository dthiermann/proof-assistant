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


; infinitely many primes: first proof

; prove that the following evaluates to true
; where for-all performs the induction on tree structure
(for-all numbers
  (implies (is-list-of-natural-numbers numbers)
           (and (is-prime (get-new-prime numbers))
                (not (in numbers (get-new-prime numbers))))))

; (for-all n (statement n))
; n is null or string or pair
; check the following:
; (statement null) = true
; (statement string) = true, for any string
; (statement a) = true, and (statement b) = true,
;   imply (statement (pair a b)) = true


  


                   
(define (get-new-prime numbers)
  (smallest-factor (sum (set-product numbers) 1)))

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

  
