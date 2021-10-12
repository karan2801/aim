from typing import Dict

from aim.storage.inmemorytreeview import InMemoryTreeView


class CustomObject:
    registry: Dict[str, type] = {}

    def __init__(self):
        pass

    @staticmethod
    def alias(name: str, exist_ok: bool = True):
        def decorator(cls):
            if name in CustomObject.registry and not exist_ok:
                raise ValueError('hey-hoy-hoparr, arden ka')
            CustomObject.registry[name] = cls
            return cls
        return decorator

    @staticmethod
    def by_name(name: str):
        return CustomObject.registry[name]

    def __new__(cls, *args, _storage = None, **kwargs):
        obj = super().__new__(cls)

        if _storage is None:
            obj.storage = InMemoryTreeView(container={})
            obj.__init__(*args, **kwargs)
        else:
            obj.storage = _storage
        return obj

    def _aim_encode(self):
        # TODO more effective
        return self.AIM_NAME, self.storage[...]

    @classmethod
    def _aim_decode(cls, aim_name, storage):
        custom_cls = cls.by_name(aim_name)
        return cls.__new__(custom_cls, _storage=storage)