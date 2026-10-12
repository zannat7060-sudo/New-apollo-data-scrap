# Generates favicon, touch icon, logo and Open Graph image into ./dist (run after build.js)
from PIL import Image, ImageDraw, ImageFont
import os
D='dist'
os.makedirs(D+'/assets/img',exist_ok=True)
BLUE=(39,80,240); INK=(14,26,47); WHITE=(255,255,255)
def grid(draw,x0,y0,size,line):
    u=size/26.0
    for j,y in enumerate([1,9.5,18]):
        for i,x in enumerate([1,9.5,18]):
            c=(i==1 and j==1)
            box=[x0+x*u,y0+y*u,x0+(x+7)*u,y0+(y+7)*u]
            col=BLUE if c else line
            draw.rounded_rectangle(box,radius=u,fill=BLUE if c else None,outline=col,width=max(1,int(u*1.6)))
def icon(px,bg,line,pad_ratio=0.18,rounded=True):
    S=px*4; im=Image.new('RGBA',(S,S),(0,0,0,0)); d=ImageDraw.Draw(im)
    if bg: d.rounded_rectangle([0,0,S-1,S-1],radius=int(S*0.22) if rounded else 0,fill=bg)
    pad=int(S*pad_ratio); grid(d,pad,pad,S-2*pad,line)
    return im.resize((px,px),Image.LANCZOS)
icon(512,INK,WHITE).save(D+'/assets/img/logo-512.png')
icon(180,INK,WHITE,rounded=False).convert('RGB').save(D+'/apple-touch-icon.png')
icon(64,INK,WHITE).save(D+'/favicon.ico',sizes=[(16,16),(32,32),(48,48)])
cells=''
for j,y in enumerate([1,9.5,18]):
    for i,x in enumerate([1,9.5,18]):
        c=(i==1 and j==1)
        cells+=f'<rect x="{x}" y="{y}" width="7" height="7" rx="1" fill="{"#2750F0" if c else "none"}" stroke="{"#2750F0" if c else "#fff"}" stroke-width="1.6"/>'
open(D+'/favicon.svg','w').write(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="-5 -5 36 36"><rect x="-5" y="-5" width="36" height="36" rx="8" fill="#0E1A2F"/>{cells}</svg>\n')
W,H=1200,630
im=Image.new('RGB',(W,H),INK); d=ImageDraw.Draw(im)
for x in range(0,W,48): d.line([(x,0),(x,H)],fill=(24,38,64),width=1)
for y in range(0,H,48): d.line([(0,y),(W,y)],fill=(24,38,64),width=1)
def font(bold,size):
    L='/usr/share/fonts/truetype/liberation/LiberationSans-'+('Bold' if bold else 'Regular')+'.ttf'
    return ImageFont.truetype(L,size) if os.path.exists(L) else ImageFont.load_default()
lg=icon(72,None,WHITE,pad_ratio=0.02); im.paste(lg,(80,70),lg)
d.text((168,84),'ApolloDataScrap',font=font(True,40),fill=WHITE)
y=190
for t in ['Apollo & LinkedIn lead data,','delivered in a clean','Google Sheet.']:
    d.text((80,y),t,font=font(True,70),fill=WHITE); y+=88
d.rectangle([80,y+14,200,y+20],fill=(240,97,43))
d.text((80,y+44),'Emails, mobile numbers and company data in one file.',font=font(False,32),fill=(184,195,218))
d.rounded_rectangle([860,420,1130,560],radius=14,fill=WHITE)
for i,(w,c) in enumerate([(200,(220,243,232)),(150,(231,236,254)),(180,(220,243,232))]):
    d.rounded_rectangle([884,444+i*38,884+w,466+i*38],radius=11,fill=c)
im.save(D+'/assets/img/og-image.png',optimize=True)
print('assets ok')
