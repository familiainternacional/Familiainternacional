from pathlib import Path
import re

ts = Path('src/lib/db/supabase-ca.ts').read_text(encoding='utf-8')
m = re.search(r"SUPABASE_PROD_CA_2021 = ('.*');", ts, re.S)
assert m, 'constant not found'
pem_from_ts = eval(m.group(1))
pem_from_file = Path('certs/supabase-prod-ca-2021.crt').read_text(encoding='utf-8').replace('\r\n', '\n').strip() + '\n'
print('match', pem_from_ts == pem_from_file)
print('len', len(pem_from_ts))
print('starts', pem_from_ts.startswith('-----BEGIN CERTIFICATE-----'))
