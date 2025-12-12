from app.db.mongo import orgs, db
from app.utils.helpers import slugify

async def org_exists(name: str):
    return await orgs.find_one({'name': name}) is not None

async def create_org_record(name: str, admin_id):
    slug = slugify(name)
    coll = f"org_{slug}"
    await db[coll].insert_one({'_meta':'init'})
    doc = {'name': name, 'collection': coll, 'admin_id': admin_id}
    res = await orgs.insert_one(doc)
    doc['_id'] = res.inserted_id
    return doc

async def get_org_by_name(name: str):
    return await orgs.find_one({'name': name})

async def rename_org_collection(old_name: str, new_name: str):
    old_slug = slugify(old_name)
    new_slug = slugify(new_name)
    old_coll = f"org_{old_slug}"
    new_coll = f"org_{new_slug}"
    old_ref = db[old_coll]
    new_ref = db[new_coll]
    cursor = old_ref.find({})
    docs = []
    async for d in cursor:
        d.pop('_id', None)
        docs.append(d)
    if docs:
        await new_ref.insert_many(docs)
    await old_ref.drop()
    return new_coll

async def delete_org_collection(collection_name: str):
    await db[collection_name].drop()
