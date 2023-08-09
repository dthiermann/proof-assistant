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


Let f: (list natural) -> natural
Let (f n) = (product ps) + 1

prime-factor-existence = for-all natural k, there-exists natural p st (p prime) and p divides k

take any n in N
then (f n) in N
then by prime-factor-existence,
there exists p st p prime and p divides (f n)

so for all n in N, there exists p st p prime, p divides (f n).


Suppose p is in ps.
Let rest = all the elements of ps except p
Then p * rest = product ps
Then p divides (product ps).

Summary:
(p in ps) implies (p divides (product ps))
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







           



