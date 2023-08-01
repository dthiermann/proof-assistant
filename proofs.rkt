#lang racket
; how does the actual program work?
; user enters statement in some formal language
; user enters proof in some formal proof language
; user-entered proof takes the form of a series of statements,
; such that each statement is implied by some statements above,
; does the user have to provide inference rules for each step?

; computer checks that the proof is valid
; goal, computer automates some steps, or some kinds of proofs

; some different ways of representing statements and proofs:

; statements are expressions that either evaluate to true/false, or do not terminate,
; the proof is syntactic analysis of the statement to prove whether or not it terminates/with what value



;DEFINITIONS

(define (infinite set) (not (finite set)))
(define (finite set) (there-exists natural-number n
                                   (there-exists f (bijection f (range n) set))))
(define (bijection f domain range)
  (and (injection f domain range) (surjection f domain range)))

(define (injection f domain range)
  (for-all a b domain (implies (equal (f a) (f b)) (equal a b))))

(define (surjection f domain range)
  (equal (image f domain) range))

list: type -> type
(define (list item-type)
  (or empty
      (pair item-type (list item-type))))

; (range n) is 0,1,2,3 ... n - 1
; (range 2 n) is 2,3,... n - 1

; a subset of natural-numbers is a function N -> [true, false]
(define (for-all set variable statement))

(define (divides a b)
  (there-exists (range b) divisor
                (equal (product a divisor) b)))

(define (small-factor n)
  (min (non-trivial-factors n)))

(define (non-trivial-factors n)
  (filter (range 2 (add1 n)) (lambda a (divides a n))))

pair-min: natural-number -> natural-number -> truth
(define (pair-min n m)
  (if (less-than n m) n m))

(define (min numbers)
  (foldleft pair-min numbers))

(define (is-prime n)
  (for-all (range n) a
    (for-all (range n) b
      (not (equal n (product a b))))))

(define natural-number
  (or zero
      (add1 natural-number)))


; THEOREMS

; commutativity of and
statement = (implies (and a b) (and b a))

Cases:
(and a b) = false, then statement is true
(and a b) = true
a = true
b = true

(and b a)
(and true true) = true




;infinitely many prime numbers

Proof:
let primes be a list of primes
let (f primes) = prime-factor(1 + (product primes))

where (prime-factor n) =
(factor-in-range 2 n)

where (factor-in-range start n) =
start if (divides start n)
n if (equal start n)
else (factor-in-range (start + 1) n)

Then for all lists of primes "primes",
(f primes) is prime and (f primes) is not in primes:

for all n in 2,3, ... , (prime-factor n) is prime:









(for-all natural-numbers n (and (is-prime (f n)) (greater-than (f n) n)))

theorem: small-factor-is-prime
(for-all natural-numbers n (is-prime (small-factor n)))

proof:

(let k (small-factor n))
(let a (in (range 2 k)))
(not (divides a n))
(implies (not (divides a n)) (not (divides a k)))
(not (divides a k))
(is-prime k)

k small-factor n
means
k divides n
and
if 1 < a < k, then a does not divide n

a does not divide n
there doesn't exist m st am = n
for all m, am != n
there exists t st kt = n

there exists t st
for all m, am != kt
for all c, atc != kt
ac != k
so a does not divide k

k smallest non-one factor of n
(exclusive-interval 1 k) does not divide n
n is not in product (exclusive-interval 1 k) N
n is in product k N

want to show: k is not in product (exclusive-interval 1 k) N




(for-all n (greater-than (prime-factor (add1 (factorial n))) n))

let new-prime = prime-factor (add1 (factorial n))

new-prime is greater than 1
doesn't divide 1

divides (add1 (factorial n))
if it divided (factorial n), then
it would also divide (difference (add1 (factorial n)) (factorial n)) = 1,
but it doesn't, so
it doesn't divide (factorial n)

relying on a lemma: a divides b, a divides c, c < b, then a divides (difference b c)
(implies (divides a b)
         (divides a c)
         (less-than c b)
         (divides a (difference b c)))


;substitution and distribution
(difference b c) = (difference ak aq) = a (k - q)
so a divides (difference b c)

so can't be anything in 1,2,...n
so is > n

; every number has a prime factorization
if n has no divisors between 1 and n,
then its prime factors are [1,n]
-------------------------------------------------------------------------
; sum of two odd numbers is even
for all odd numbers a,b,
a + b is even

; rephrased to quantify over all N
for all numbers a,b
(a,b odd) implies ((a + b) even)

a = (s n)
b = (s m)

odd a = odd (p (p a))
odd b = odd (p (p b))

even (a + b) = 


; rephrased to avoid variables and quantifiers
(is-subset (sum odd odd) even)

odd = (sum (product 2 natural-numbers) one)



odd = 2N + 1
2 * 0 + 1 = 1
2* (s n) + 1 = 2n + 3
sum odd odd
1 + 1 = 2
2n + 4
2(N + N) + 6
N + N = N
2,4, 2N + 6 = 2N + 2*3 = 2N




possible definitions of odd:
n odd
there exist a number k st n = 2k + 1
2 does not divide n --> there does not exist a number k st n = 2k,
0 even, 1 odd, is-odd(n) = is-odd(n - 2)

Proof using first definition
a, b odd
there exists k,q, st
a = 2k + 1
b = 2q + 1
a + b = (2k + 1) + (2q + 1) = 2(k + q) + 2 = 2(k + q + 1)
there exists m st
(a + b) = 2m
so (a + b) is even


(for-all natural-number a
  (for-all natural-number b
    (implies (and (is-odd a) (is-odd b))
             (is-even (sum a b)))))

(define (for-all natural-number statement)
  (define (for-all-in-range start)
    (if (statement start) (for-all-in-range (add1 start))
        false)))


(implies (and (is-odd a)
              (is-odd b))
         (is-even (sum a b)))

(implies true true) = true
(implies true false) = false
(implies false false) = true
(implies false true) = true

(and true true) = true
else false

(is-odd a)


