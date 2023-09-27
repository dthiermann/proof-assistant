; theorem
(implies (even m)
         (even (square m)))

; relevant defs
(define (even m)
  (there-exists integer n
                (equal (product 2 n) m)))

; statements in proof
(even m)
;assumption

(there-exists integer n
              (equal (product 2 n) m))
; by def of even

(equal (product 2 n) m)
;taking witness from existence statement

(equal (square (product 2 n)) (square m))
; a = b implies (f a) = (f b)
; where f = square

(equal (square m) (product 4 (square n)))
; definition of square and associativity and commutativity of multiplication

(equal (square m) (product 2 (product 2 (square n))))
; associativity and commutativity of multiplication

(there-exists integer k
              (equal (square m) (product 2 k)))
; using the witness (product 2 (square n)) as k to write an existence statement 

(even (square m))
; using definition of even

(implies (even m) (even (square m)))
; from derivation beginning with (even m) and ending with (even (square m))


