import Navbar from '@/components/user/layout/Navbar';
import Footer from '@/components/user/layout/Footer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { formatVND } from '@/lib/utils';
import { useCart } from '@/context/CartContext';
import { Trash2 } from 'lucide-react';

const CartPage = () => {
  const { items, removeItem, clear, total } = useCart();

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-20">
        <section className="bg-gradient-hero text-primary-foreground py-12">
          <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold font-['Be Vietnam Pro']">Giỏ hàng</h1>
            <p className="text-primary-foreground/80">Xem và quản lý các khoá học đã thêm</p>
          </div>
        </section>

        <section className="py-10">
          <div className="container mx-auto px-4 grid lg:grid-cols-3 gap-8">
            <Card className="p-6 lg:col-span-2 space-y-4">
              {items.length === 0 ? (
                <p className="text-muted-foreground">Giỏ hàng trống. Hãy thêm khoá học từ danh sách khoá học.</p>
              ) : (
                items.map((i) => (
                  <div key={i.id} className="flex items-center justify-between border-b border-border pb-4 last:border-none last:pb-0">
                    <div>
                      <h3 className="font-semibold">{i.title}</h3>
                      <p className="text-muted-foreground">{formatVND(i.price)}</p>
                    </div>
                    <Button variant="ghost" onClick={() => removeItem(i.id)}>
                      <Trash2 className="w-4 h-4 mr-2" />
                      Xoá
                    </Button>
                  </div>
                ))
              )}
            </Card>

            <Card className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Tổng cộng</span>
                <span className="text-2xl font-bold text-primary">{formatVND(total)}</span>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1" onClick={clear} disabled={items.length === 0}>
                  Xoá giỏ hàng
                </Button>
                <Button className="flex-1 bg-gradient-primary shadow-accent" disabled={items.length === 0}>
                  Thanh toán
                </Button>
              </div>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default CartPage;