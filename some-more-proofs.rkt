(implies (even m) (even (square m)))

(define (even n) (there-exists natural k
                  (equal (product 2 k) n)))

; by def of even
(there-exists natural k
 (equal (product 2 k) m))

(implies (equal a b) (equal (f a) (f b)))


(for-all natural (a b)
 (implies (equal (product 2 k) m)
  (equal (square m) (square (
