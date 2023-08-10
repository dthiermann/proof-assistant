#lang racket
;DEFINITIONS

(define (fold-product items)
  (fold product items))

(define (divides a b)
  (there-exists natural-number k (equal (product a k) b)))

(define (in list item)
  (cond ((null list) false)
        ((equal item (first list)) true)
        (else (in (rest list) item))))

; NATURAL LANGUAGE PROOF

Let ps be a list of prime numbers
Let n = (product ps) + 1

By prime-factor existence,
there is a prime p that divides n

Suppose p is in ps.
Then p divides (product ps).

Summary:
p divides (product ps)
p divides n

suppose that for any numbers a,b,c, (with b > c)
(and (divides a b) (divides a c))
then there exists witnesses k, m,
st
ak = b
am = c
so
ak - am = b - c
a(k - m) = b - c
so a divides (b - c)

applying this to
p divides (product ps)
p divides n
we get
p divides (difference n (product ps)) = 1

p divides 1
there exists q st
pq = 1
if q = 0, then pq = 0
so q > 0
but then pq >= p > 1
pq = 1 and pq > 1
contradiction

Summary of previous part:
(p in ps) implies contradiction
so p is not in ps
p is prime

so for any finite set of primes ps,
there is a prime p not in ps,
so the set of primes is not equal to ps,
so the set of primes is infinite,

; PROOF in the form of inference rules

;LIST OF INFERENCE RULES
A valid inference is a composition of the primitive inference rules listed here:

(let x (any set)) creates a variable x representing an arbitrary member of set
anything proved about x is proved for all x in set

universal elim:
for-all a in A, (statement a)
b in A,
----------
(statement b)

universal intro:
(statement k) can be derived from (k in A)
---------
for-all a in A, (statement a)

;DEFINITIONS
(define (list item-type)
  (or empty (pair item-type (list item-type))))


(define (list-product empty) 1)
(define (list-product (pair n nums))
  (product n (list-product nums)))


;PROOF

(let ps (any (list prime)))
(let n  (add1 (product ps)))

prime-factor existence:
witness: (prime-factor n)

(let p (prime-factor n))
(divides p n)
(prime p)

(suppose (in p ps))

multiplication commutative and associative
implies

list-product ps
= list-product swap-p-with-first-element
= product p (list-product everything-else)

Then p divides (product ps).

Summary:
(p in ps) implies (p divides (product ps))
p divides n

(let (a,b,c) (any (tuple 3 natural-number)))
(suppose (and (greater-than b c)
              (divides a b)
              (divides a c)))

(divides a b)
means we have a constructor (divisor a b)
st (product a (divisor a b)) = b

(let k (divisor a b))
(let m (divisor a c))

(equal (product a k) b)
(equal (product a m) c)

(equal (difference (product a k) (product a m))
       (difference b c))

(equal (product a (difference k m))
       (difference b c))

so
(divides a (difference b c))

applying this to

p divides (product ps)
p divides n
we get
p divides (difference n (product ps)) = 1

p divides 1
there exists q st
pq = 1
if q = 0, then pq = 0
so q > 0
but then pq >= p > 1
pq = 1 and pq > 1
contradiction

Summary of previous part:
(p in ps) implies contradiction
so p is not in ps
p is prime

so for any finite set of primes ps,
there is a prime p not in ps,
so the set of primes is not equal to ps,
so the set of primes is infinite,








           



