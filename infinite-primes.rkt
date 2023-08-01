#lang racket

; OUTLINE OF THE PROOF

(define (f n) (small-factor (add1 (factorial n))))

for all n, (f n) > n :

Proof:
(f n) > 1
(f n) divides n! + 1
so (f n) doesn't divide n!
so (f n) doesn't divide any of 2,3,4, ... n
so (f n) isn't equal to 2,3,4, ... n
and (f n) > 1
so (f n) > n



for all n, (small-factor n) is prime:

Proof:
let k = small-factor n
for any a st 1 < a < k , a does not divide n (by def of small-factor)
k divides n, a does not divide n, implies a does not divide k,
so k is prime

; EACH STEP IN DETAIL

; for all n, (f n) > 1
n! > 0,
(n! + 1) > 1
if a > 1, then (small-factor a) > 1

; for all n, (f n) divides n! + 1




