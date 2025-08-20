from fastapi import FastAPI, HTTPException
import os
import psycopg2

app = FastAPI()

conn = psycopg2.connect(os.environ.get('DATABASE_URL'))
cursor = conn.cursor()

@app.post('/orders')
def create_order(item_id: int, quantity: int):
    cursor.execute('INSERT INTO orders (item_id, quantity, status) VALUES(%s,%s,%s) RETURNING id', (item_id, quantity, 'RECEBIDO'))
    order_id = cursor.fetchone()[0]
    conn.commit()
    return {'order_id': order_id, 'status': 'RECEBIDO'}

@app.get('/orders/{order_id}')
def get_order(order_id: int):
    cursor.execute('SELECT * FROM orders WHERE id=%s', (order_id,))
    order = cursor.fetchone()
    if order:
        return {'id': order[0], 'item_id': order[1], 'quantity': order[2],
'status': order[3]}
    raise HTTPException(status_code=404, detail='Order not found')

@app.get('/health')
def health():
    return {'status':'UP'}

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host='0.0.0.0', port=8000)